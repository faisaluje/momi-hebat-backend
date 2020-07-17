import { ClientSession } from 'mongoose'

import { KartuPaketAgenService } from '../../agen/services/kartu-paket-agen'
import { BadRequestError } from '../../common/errors/bad-request-error'
import { NotFoundError } from '../../common/errors/not-foud-error'
import { KartuPaket } from '../../kartu-paket/models/kartu-paket'
import { KartuPaketService } from '../../kartu-paket/services/kartu-paket'
import { StokKartuPaketService } from '../../kartu-paket/services/stok-kartu-paket'
import { PeriodeAktif } from '../../periode/services/periode-aktif'
import { TransaksiKartuPaket, TransaksiKartuPaketAttrs, TransaksiKartuPaketDoc } from '../models/transaksi-kartu-paket'
import { ItemsService } from './items'
import { NoTransaksiKartuPaket } from './no-transaksi-kartu-paket'

export class TransaksiKartuPaketService {
  static async createTransaksiKartuPaket(
    data: TransaksiKartuPaketAttrs,
    session: ClientSession
  ): Promise<TransaksiKartuPaketDoc> {
    const periode = await PeriodeAktif.getPeriodeAktif();
    if (!periode) {
      throw new BadRequestError('Periode tidak ditemkan');
    }

    await KartuPaket.createCollection();
    await TransaksiKartuPaket.createCollection();

    try {
      const noTransaksiKartuPaket = await NoTransaksiKartuPaket.generateNoTransaksi(
        { ...data, periode }
      );
      const listKartuPaket = await KartuPaketService.getListKartuPaket(
        data.items.map((item) => item.kartuPaket),
        session
      );

      const items = ItemsService.getItems(listKartuPaket, data.items);

      const transaksiKartuPaket = TransaksiKartuPaket.build(
        {
          ...data,
          items,
          periode,
        },
        noTransaksiKartuPaket
      );

      await transaksiKartuPaket.save({ session });
      await StokKartuPaketService.updateStokKartuPaket(transaksiKartuPaket, {
        session,
      });

      if (transaksiKartuPaket.agen) {
        await KartuPaketAgenService.upsertStokKartuPaketAgen(
          transaksiKartuPaket,
          { session }
        );
      }

      return transaksiKartuPaket;
    } catch (e) {
      console.error(e);
      await session.abortTransaction();
      session.endSession();
      throw new BadRequestError('Gagal menyimpan transaksi');
    }
  }

  static async deleteTransaksiKartuPaket(
    transaksiKartuPaketId: string,
    session: ClientSession
  ): Promise<void> {
    const transaksiKartuPaket = await TransaksiKartuPaket.findById(
      transaksiKartuPaketId
    );
    if (!transaksiKartuPaket) throw new NotFoundError();

    try {
      transaksiKartuPaket.$session(session);
      await transaksiKartuPaket.delete();
      await StokKartuPaketService.updateStokKartuPaket(transaksiKartuPaket, {
        deleted: true,
        session,
      });

      if (transaksiKartuPaket.agen) {
        await KartuPaketAgenService.upsertStokKartuPaketAgen(
          transaksiKartuPaket,
          { session, deleted: true }
        );
      }
    } catch (e) {
      console.error(e);
      await session.abortTransaction();
      session.endSession();
      throw new BadRequestError('Gagal menghapus transaksi');
    }
  }
}
