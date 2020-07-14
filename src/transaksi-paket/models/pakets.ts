import mongoose, { ClientSession } from 'mongoose'

import { BadRequestError } from '../../common/errors/bad-request-error'
import { ItemDoc } from '../../transaksi-barang/models/transaksi-barang'
import { TransaksiPaket } from './transaksi-paket'

export class Pakets {
  static async getAllBarang(
    transaksiPaketId: string,
    session?: ClientSession
  ): Promise<ItemDoc[]> {
    const query = TransaksiPaket.findById(transaksiPaketId);
    if (session) query.session(session);
    const transaksiPaket = await query.populate('pakets.jenisPaket').exec();
    if (!transaksiPaket) {
      throw new BadRequestError('Transaksi paket tidak ditemukan');
    }

    const barangs: ItemDoc[] = [];

    for (const paket of transaksiPaket.pakets) {
      for (const barang of paket.jenisPaket.barangs) {
        const item = barangs.find((val) =>
          mongoose.Types.ObjectId(val.barang._id).equals(barang._id)
        );
        if (!item) {
          barangs.push({
            barang: barang,
            jumlah: paket.jumlah,
            biaya: 0,
          });
        } else {
          item.jumlah += paket.jumlah;
        }
      }
    }

    return barangs;
  }
}
