import { ItemDoc } from '../models/transaksi-barang';
import { BarangDoc } from '../../barang/models/barang';
import { BadRequestError } from '../../common/errors/bad-request-error';

export class Items {
  static async getItems(
    listBarang: BarangDoc[],
    items: ItemDoc[]
  ): Promise<ItemDoc[]> {
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
}
