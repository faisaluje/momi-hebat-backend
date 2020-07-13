import { JenisPaket, JenisPaketDoc } from '../models/jenis-paket'

export class JenisPaketService {
  static async getListJenisPaket(
    jenisPakets: JenisPaketDoc[]
  ): Promise<JenisPaketDoc[]> {
    const listJenisPaket = await JenisPaket.find({
      _id: { $in: jenisPakets.map((jenisPaket) => jenisPaket.id) },
    });

    return listJenisPaket;
  }
}
