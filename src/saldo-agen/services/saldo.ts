import { ClientSession } from 'mongoose'

import { PeriodeDoc } from '../../periode/models/periode'
import { SaldoAgen, SaldoAgenDoc } from '../models/saldo-agen'

export class Saldo {
  static async getSaldoByPeriode(
    periode: PeriodeDoc,
    session?: ClientSession
  ): Promise<SaldoAgenDoc> {
    let saldoAgen = await SaldoAgen.findOne({ periode });
    if (!saldoAgen) {
      saldoAgen = SaldoAgen.build({
        periode: periode._id,
        saldo: [],
      });
      await saldoAgen.save({ session });
    }

    return saldoAgen;
  }
}
