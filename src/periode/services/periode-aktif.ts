import { PeriodeDoc, Periode } from '../models/periode';
import { PeriodeStatus } from '../enums/periode-status';

export class PeriodeAktif {
  static async getPeriodeStatus(periode: PeriodeDoc): Promise<PeriodeStatus> {
    const periodeAktif = await Periode.findOne({ status: PeriodeStatus.AKTIF });
    if (!periodeAktif) {
      return periode.status;
    }

    return PeriodeStatus.TIDAK_AKTIF;
  }
}
