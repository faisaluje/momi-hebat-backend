import mongoose from 'mongoose';
import { PeriodeDoc, Periode } from '../models/periode';
import { PeriodeStatus } from '../enums/periode-status';

export class PeriodeAktif {
  static async getPeriodeAktif(): Promise<PeriodeDoc | null> {
    const periodeAktif = await Periode.findOne({ status: PeriodeStatus.AKTIF });

    return periodeAktif;
  }

  static async setPeriodeAktif(id: string): Promise<void> {
    const periodeAktif = await Periode.findOne({
      _id: { $ne: mongoose.Types.ObjectId(id) },
      status: PeriodeStatus.AKTIF,
    });

    if (periodeAktif) {
      periodeAktif.status = PeriodeStatus.TIDAK_AKTIF;
      await periodeAktif.save();
    }
  }
}
