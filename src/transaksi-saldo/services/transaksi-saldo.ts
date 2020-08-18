import { Types } from 'mongoose'
import { ClientSession } from 'mongoose'

import { Agen } from '../../agen/models/agen'
import { SaldoAgenService } from '../../agen/services/saldo-agen'
import { BadRequestError } from '../../common/errors/bad-request-error'
import { PeriodeDoc } from '../../periode/models/periode'
import { PeriodeAktif } from '../../periode/services/periode-aktif'
import { TransaksiSaldo, TransaksiSaldoAttrs, TransaksiSaldoDoc } from '../models/transaksi-saldo'
import { NoTransaksiSaldo } from './no-transaksi-saldo'

export class TransaksiSaldoService {
  static async createTransaksiSaldo(
    data: TransaksiSaldoAttrs,
    options: { session?: ClientSession; periode?: PeriodeDoc }
  ): Promise<TransaksiSaldoDoc> {
    const agen = await Agen.findById(Types.ObjectId(data.agen.id));
    const periode = options.periode || (await PeriodeAktif.getPeriodeAktif());
    if (!agen || !periode) {
      throw new BadRequestError('Agen / Periode tidak ditemukan');
    }

    const noTransaksiSaldo = await NoTransaksiSaldo.generateNoTransaksi({
      ...data,
      agen,
      periode,
    });

    const transaksiSaldo = TransaksiSaldo.build({
      ...data,
      no: noTransaksiSaldo,
      agen,
      periode,
    });

    await transaksiSaldo.save({ session: options.session });
    await SaldoAgenService.upsertSaldoAgen(transaksiSaldo, {
      session: options.session,
    });

    return transaksiSaldo;
  }

  static getTransaksiSaldoOne(
    transaksiSaldoId: string
  ): Promise<TransaksiSaldoDoc | null> {
    return TransaksiSaldo.findById(transaksiSaldoId)
      .populate('agen')
      .populate('periode')
      .exec();
  }
}
