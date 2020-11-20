import { ClientSession } from 'mongoose'

import { NotFoundError } from '../../common/errors/not-foud-error'
import { PeriodeDoc } from '../../periode/models/periode'
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

  static async generateKartuPakets(
    periode: PeriodeDoc,
    session?: ClientSession
  ): Promise<void> {
    const periodeAktif = await PeriodeAktif.getPeriodeAktif();
    if (!periodeAktif) {
      throw new NotFoundError();
    }

    const listKartuPaketExisting = await KartuPaket.find({
      periode: periodeAktif,
    });

    if (listKartuPaketExisting.length > 0) {
      await KartuPaket.insertMany(
        listKartuPaketExisting.map((kartuPaket) => ({
          nama: kartuPaket.nama,
          stok: 0,
          periode: periode._id,
        })),
        { session }
      );
    }
  }
}
