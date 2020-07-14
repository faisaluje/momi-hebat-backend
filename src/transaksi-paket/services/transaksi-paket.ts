import mongoose, { ClientSession } from 'mongoose'

import { Agen } from '../../agen/models/agen'
import { BadRequestError } from '../../common/errors/bad-request-error'
import { NotFoundError } from '../../common/errors/not-foud-error'
import { PeriodeAktif } from '../../periode/services/periode-aktif'
import { StokPaketService } from '../../stok-paket/services/stok-paket'
import { TransaksiPaket, TransaksiPaketAttrs, TransaksiPaketDoc } from '../models/transaksi-paket'
import { NoTransaksiPaket } from './no-transaksi-paket'
import { PaketsService } from './pakets'

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

    await TransaksiPaket.createCollection();

    const pakets = await PaketsService.getPakets(data.pakets);
    const transaksiPaket = TransaksiPaket.build({
      ...data,
      no: noTransaksiPaket,
      periode,
      pakets,
    });

    if (data.agen) {
      const agen = await Agen.findById(data.agen.id);
      transaksiPaket.set({ agen });
    }

    try {
      await transaksiPaket.save({ session: session });
      await StokPaketService.upsertStokPaket(transaksiPaket, {
        session: session,
      });

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
      await StokPaketService.upsertStokPaket(transaksiPaket, {
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
