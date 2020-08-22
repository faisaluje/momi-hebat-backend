import { ClientSession } from 'mongoose'

import { BadRequestError } from '../../common/errors/bad-request-error'
import { NotFoundError } from '../../common/errors/not-foud-error'
import { StokPaketService } from '../../jenis-paket/services/stok-paket'
import { PaketsService } from '../../paket/services/pakets'
import { PeriodeAktif } from '../../periode/services/periode-aktif'
import { TransaksiPaket, TransaksiPaketAttrs, TransaksiPaketDoc } from '../models/transaksi-paket'
import { NoTransaksiPaket } from './no-transaksi-paket'

export class TransaksiPaketService {
  static async createTransaksiPaket(
    data: TransaksiPaketAttrs,
    session: ClientSession
  ): Promise<TransaksiPaketDoc> {
    const periode = await PeriodeAktif.getPeriodeAktif();
    if (!periode) throw new NotFoundError();

    const noTransaksiPaket = await NoTransaksiPaket.generateNoTransaksi({
      ...data,
      periode,
    });

    const pakets = await PaketsService.getPakets(data.pakets);
    const transaksiPaket = TransaksiPaket.build({
      ...data,
      no: noTransaksiPaket,
      periode,
      pakets,
    });

    if (data.agen) {
      transaksiPaket.set({ agen: data.agen });
    }

    try {
      await transaksiPaket.save({ session });
      await StokPaketService.updateStokPaket(transaksiPaket, { session });

      return transaksiPaket;
    } catch (e) {
      console.error(e);
      await session.abortTransaction();
      session.endSession();
      throw new BadRequestError('Gagal menyimpan transaksi paket');
    }
  }

  static async deleteTransaksiPaket(
    transaksiPaketId: string,
    session: ClientSession
  ): Promise<void> {
    const transaksiPaket = await TransaksiPaket.findById(transaksiPaketId);
    if (!transaksiPaket) throw new NotFoundError();

    try {
      transaksiPaket.$session(session);
      await transaksiPaket.delete();
      await StokPaketService.updateStokPaket(transaksiPaket, {
        deleted: true,
        session,
      });
    } catch (e) {
      console.error(e);
      await session.abortTransaction();
      session.endSession();
      throw new BadRequestError('Gagal menghapus transaksi paket');
    }
  }
}
