import { ClientSession } from 'mongoose'

import { PeriodeDoc } from '../../periode/models/periode'
import { SaldoAgen, SaldoAgenDoc } from '../models/saldo-agen'

export class Saldo {
  static async getSaldoByPeriode(periode: PeriodeDoc): Promise<SaldoAgenDoc> {
    let saldoAgen = await SaldoAgen.findOne({ periode });
    if (!saldoAgen) {
      saldoAgen = SaldoAgen.build({
        periode: periode._id,
        saldo: [],
      });
    }

    return saldoAgen;
  }
}
