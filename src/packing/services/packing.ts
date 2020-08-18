import { Packing, PackingDoc } from '../models/packing'

export class PackingService {
  static getPackingOne(packingId: string): Promise<PackingDoc | null> {
    return Packing.findById(packingId)
      .populate('periode')
      .populate('proses.karyawan')
      .populate('proses.jenisPaket')
      .exec();
  }
}
