import mongoose from 'mongoose'

import { BarangService } from '../../barang/services/barang'
import { BadRequestError } from '../../common/errors/bad-request-error'
import { PeriodeAktif } from '../../periode/services/periode-aktif'
import { StokBarangService } from '../../stok-barang/services/stok-barang'
import { TransaksiBarang, TransaksiBarangAttrs, TransaksiBarangDoc } from '../models/transaksi-barang'
import { Items } from './items'
import { NoTransaksiBarang } from './no-transaksi-barang'

export class TransaksiBarangService {
  static async createTransaksiBarang(
    data: TransaksiBarangAttrs
  ): Promise<TransaksiBarangDoc> {
    const periode = await PeriodeAktif.getPeriodeAktif();
    if (!periode) {
      throw new BadRequestError('Periode tidak ditemkan');
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const noTransaksiBarang = await NoTransaksiBarang.generateNoTransaksi({
        ...data,
        periode,
      });
      const listBarang = await BarangService.getListBarang(
        data.items.map((item) => item.barang),
        session
      );
      const items = Items.getItems(listBarang, data.items);
      const transaksiBarang = TransaksiBarang.build({
        ...data,
        no: noTransaksiBarang,
        items,
        periode,
      });
      await transaksiBarang.save({ session });

      await StokBarangService.upsertStokBarang(transaksiBarang, { session });

      await session.commitTransaction();
      session.endSession();

      return transaksiBarang;
    } catch (e) {
      console.error(e);
      await session.abortTransaction();
      session.endSession();
      throw new BadRequestError('Gagal menyimpan transaksi');
    }
  }
}
