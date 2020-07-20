import { ClientSession } from 'mongoose';

import { BarangService } from '../../barang/services/barang';
import { BadRequestError } from '../../common/errors/bad-request-error';
import { NotFoundError } from '../../common/errors/not-foud-error';
import { PeriodeAktif } from '../../periode/services/periode-aktif';
import { StokBarangService } from '../../stok-barang/services/stok-barang';
import {
  TransaksiBarang,
  TransaksiBarangAttrs,
  TransaksiBarangDoc,
} from '../models/transaksi-barang';
import { ItemsService } from './items';
import { NoTransaksiBarang } from './no-transaksi-barang';

export class TransaksiBarangService {
  static async createTransaksiBarang(
    data: TransaksiBarangAttrs,
    session: ClientSession
  ): Promise<TransaksiBarangDoc> {
    const periode = await PeriodeAktif.getPeriodeAktif();
    if (!periode) {
      throw new BadRequestError('Periode tidak ditemkan');
    }

    try {
      const noTransaksiBarang = await NoTransaksiBarang.generateNoTransaksi({
        ...data,
        periode,
      });
      const listBarang = await BarangService.getListBarang(
        data.items.map((item) => item.barang),
        session
      );
      const items = ItemsService.getItems(listBarang, data.items);
      const transaksiBarang = TransaksiBarang.build({
        ...data,
        no: noTransaksiBarang,
        items,
        periode,
      });
      await transaksiBarang.save({ session });
      await StokBarangService.upsertStokBarang(transaksiBarang, { session });

      return transaksiBarang;
    } catch (e) {
      console.error(e);
      await session.abortTransaction();
      session.endSession();
      throw new BadRequestError('Gagal menyimpan transaksi');
    }
  }

  static async deleteTransaksiBarang(
    transaksiBarangId: string,
    session: ClientSession
  ): Promise<void> {
    const transaksiBarang = await TransaksiBarang.findById(transaksiBarangId);
    if (!transaksiBarang) throw new NotFoundError();

    try {
      transaksiBarang.$session(session);
      await transaksiBarang.delete();
      await StokBarangService.upsertStokBarang(transaksiBarang, {
        deleted: true,
        session,
      });
    } catch (e) {
      console.error(e);
      await session.abortTransaction();
      session.endSession();
      throw new BadRequestError('Gagal menghapus transaksi');
    }
  }
}
