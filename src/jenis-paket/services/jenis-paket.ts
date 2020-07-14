import { JenisPaket, JenisPaketDoc } from '../models/jenis-paket'

export class JenisPaketService {
  static async getListJenisPaket(id: string[]): Promise<JenisPaketDoc[]> {
    const listJenisPaket = await JenisPaket.find({
      _id: { $in: id },
    });

    return listJenisPaket;
  }
}
