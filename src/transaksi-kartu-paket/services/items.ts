import { BadRequestError } from '../../common/errors/bad-request-error'
import { KartuPaketDoc } from '../../kartu-paket/models/kartu-paket'
import { TransaksiKartuPaketItem } from '../models/transaksi-kartu-paket'

export class ItemsService {
  static getItems(
    listKartuPaket: KartuPaketDoc[],
    items: TransaksiKartuPaketItem[]
  ): TransaksiKartuPaketItem[] {
    const listItems: TransaksiKartuPaketItem[] = items.map((item) => {
      const kartuPaket = listKartuPaket.find(
        (val) => val.nama === item.kartuPaket.nama
      );
      if (!kartuPaket) {
        throw new BadRequestError('Kartu Paket tidak ditemukan');
      }

      return {
        ...item,
        kartuPaket,
      };
    });

    return listItems;
  }
}
