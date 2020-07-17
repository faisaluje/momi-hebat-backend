import { UpdateStokOptions } from '../../common/dto/update-stok-options'
import { JenisTransaksi } from '../../common/enums/jenis-transaksi'
import { TransaksiKartuPaketDoc } from '../../transaksi-kartu-paket/models/transaksi-kartu-paket'
import { StokAgen } from '../models/stok-agen'

export class KartuPaketAgenService {
  static async upsertStokKartuPaketAgen(
    transaksiKartuPaket: TransaksiKartuPaketDoc,
    options: UpdateStokOptions
  ): Promise<void> {
    let multiple = transaksiKartuPaket.jenis == JenisTransaksi.MASUK ? -1 : 1;
    if (options.deleted) {
      multiple = transaksiKartuPaket.jenis == JenisTransaksi.MASUK ? 1 : -1;
    }

    for (const item of transaksiKartuPaket.items) {
      const filter = {
        agen: transaksiKartuPaket.agen,
        periode: transaksiKartuPaket.periode,
      };

      const result = await StokAgen.updateOne(
        { ...filter, 'kartuPakets.kartuPaket': item.kartuPaket },
        {
          $inc: { 'kartuPakets.$.jumlah': item.jumlah * multiple },
        },
        { session: options.session }
      );

      if (result.nModified === 0) {
        await StokAgen.updateOne(
          filter,
          {
            $addToSet: {
              kartuPakets: {
                kartuPaket: item.kartuPaket,
                jumlah: item.jumlah * multiple,
              },
            },
          },
          { session: options.session, upsert: true }
        );
      }
    }
  }
}
