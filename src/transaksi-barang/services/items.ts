import mongoose from 'mongoose';

import { BarangDoc } from '../../barang/models/barang';
import { BadRequestError } from '../../common/errors/bad-request-error';
import { JenisPaket } from '../../jenis-paket/models/jenis-paket';
import { TransaksiPaketDoc } from '../../transaksi-paket/models/transaksi-paket';
import { ItemDoc } from '../models/transaksi-barang';

export class ItemsService {
  static getItems(listBarang: BarangDoc[], items: ItemDoc[]): ItemDoc[] {
    const listItems: ItemDoc[] = items.map((item) => {
      const barang = listBarang.find(
        (barang) => barang.nama === item.barang.nama
      );
      if (!barang) {
        throw new BadRequestError('Barang tidak ditemukan');
      }

      return {
        ...item,
        barang,
      };
    });

    return listItems;
  }

  static async getItemsByTransaksiPaket(
    transaksiPaket: TransaksiPaketDoc
  ): Promise<ItemDoc[]> {
    const items: ItemDoc[] = [];

    for (const paket of transaksiPaket.pakets) {
      const jenisPaket = await JenisPaket.findById(paket.jenisPaket);

      for (const barang of jenisPaket!.barangs) {
        const item = items.find((val) =>
          mongoose.Types.ObjectId(val.barang._id).equals(barang._id)
        );
        if (!item) {
          items.push({
            barang,
            jumlah: paket.jumlah,
            biaya: 0,
          });
        } else {
          item.jumlah += paket.jumlah;
        }
      }
    }

    return items;
  }
}
