import { ClientSession } from 'mongoose'

import { PaketAgenService } from '../../agen/services/paket-agen'
import { NotFoundError } from '../../common/errors/not-foud-error'
import { PeriodeAktif } from '../../periode/services/periode-aktif'
import { TransaksiPaketAgen, TransaksiPaketAgenAttrs, TransaksiPaketAgenDoc } from '../models/transaksi-paket-agen'
import { NoTransaksiPaketAgen } from './no-transaksi-paket-agen'

export class TransaksiPaketAgenService {
  static async createTransaksiPaketAgen(
    data: TransaksiPaketAgenAttrs,
    session: ClientSession
  ): Promise<TransaksiPaketAgenDoc> {
    const periode = await PeriodeAktif.getPeriodeAktif();
    if (!periode) throw new NotFoundError();

    const noTransaksi = await NoTransaksiPaketAgen.generateNoTransaksi({
      ...data,
      periode,
    });

    const transaksiPaketAgen = TransaksiPaketAgen.build({
      ...data,
      no: noTransaksi,
      periode,
    });

    transaksiPaketAgen.items.forEach((item, idx) => {
      if (!item.jumlah) transaksiPaketAgen.items.splice(idx, 1);
    });

    await transaksiPaketAgen.save({ session });
    await transaksiPaketAgen.populate('agen').execPopulate();

    await PaketAgenService.updateStokPaketAgen(transaksiPaketAgen, { session });

    return transaksiPaketAgen;
  }

  static async deleteTransaksiPaketAgen(
    transaksiPaketAgenId: string,
    session: ClientSession
  ): Promise<void> {
    const transaksiPaketAgen = await TransaksiPaketAgen.findById(
      transaksiPaketAgenId
    ).populate('agen');
    if (!transaksiPaketAgen) throw new NotFoundError();

    transaksiPaketAgen.$session(session);
    await transaksiPaketAgen.delete();

    await PaketAgenService.updateStokPaketAgen(transaksiPaketAgen, {
      session,
      deleted: true,
    });
  }

  static getTransaksiPaketAgenOne(
    transaksiPaketAgenId: string
  ): Promise<TransaksiPaketAgenDoc | null> {
    return TransaksiPaketAgen.findById(transaksiPaketAgenId)
      .populate('periode')
      .populate('agen')
      .populate('items.paket')
      .exec();
  }
}
