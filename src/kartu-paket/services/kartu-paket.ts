import { ClientSession } from 'mongoose'

import { PeriodeAktif } from '../../periode/services/periode-aktif'
import { KartuPaket, KartuPaketDoc } from '../models/kartu-paket'

export class KartuPaketService {
  static async createKartuPaketExists(
    kartuPaketNotExists: KartuPaketDoc[],
    session?: ClientSession
  ): Promise<KartuPaketDoc[]> {
    const periodeAktif = await PeriodeAktif.getPeriodeAktif();
    const listKartuPaket = await KartuPaket.insertMany(
      kartuPaketNotExists.map((kartuPaket) => ({
        nama: kartuPaket.nama,
        periode: periodeAktif,
      })),
      { session }
    );

    return listKartuPaket;
  }

  static getKartuPaketNotExist(
    listKartuPaket: KartuPaketDoc[]
  ): KartuPaketDoc[] {
    return listKartuPaket.filter((kartuPaket) => !kartuPaket.id);
  }

  static getKartuPaketExists(listKartuPaket: KartuPaketDoc[]): KartuPaketDoc[] {
    return listKartuPaket.filter((kartupaket) => !!kartupaket.id);
  }

  static async getListKartuPaket(
    listKartuPaket: KartuPaketDoc[],
    session?: ClientSession
  ): Promise<KartuPaketDoc[]> {
    const kartuPaketExists = this.getKartuPaketExists(listKartuPaket);
    let newListKartuPaket = await KartuPaket.find({
      _id: { $in: kartuPaketExists.map((kartuPaket) => kartuPaket.id) },
    }).session(session || null);

    const kartuPaketNotExists = this.getKartuPaketNotExist(listKartuPaket);
    if (kartuPaketNotExists.length > 0) {
      const kartuPakets = await this.createKartuPaketExists(
        kartuPaketNotExists,
        session
      );
      newListKartuPaket = [...newListKartuPaket, ...kartuPakets];
    }

    return newListKartuPaket;
  }
}
