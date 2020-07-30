import { UpdateStokOptions } from '../../common/dto/update-stok-options'
import { JenisPengaturanPaketAgen } from '../../pengaturan-paket-agen/enums/jenis-pengaturan-paket-agen'
import { PengaturanPaketAgenDoc } from '../../pengaturan-paket-agen/models/pengaturan-paket-agen'
import { JenisTransaksiPaketAgen } from '../../transaksi-paket-agen/enums/jenis-transaksi-paket-agen'
import { TransaksiPaketAgenDoc } from '../../transaksi-paket-agen/models/transaksi-paket-agen'
import { StokAgen } from '../models/stok-agen'

export class PaketAgenService {
  static async updateStokPaketTersediaAgen(
    pengaturanPaketAgen: PengaturanPaketAgenDoc,
    options: UpdateStokOptions
  ): Promise<void> {
    let multiply =
      pengaturanPaketAgen.jenis == JenisPengaturanPaketAgen.BOOKING ? 1 : -1;
    if (options.deleted) {
      multiply =
        pengaturanPaketAgen.jenis == JenisPengaturanPaketAgen.BOOKING ? -1 : 1;
    }

    for (const item of pengaturanPaketAgen.items) {
      const filter = {
        agen: pengaturanPaketAgen.agen,
        periode: pengaturanPaketAgen.periode,
      };

      const result = await StokAgen.updateOne(
        { ...filter, 'pakets.paket': item.paket },
        {
          $inc: {
            'pakets.$.jumlah': item.jumlah * multiply,
            'pakets.$.stok': item.jumlah * multiply,
          },
        },
        { session: options.session }
      );

      if (result.nModified === 0) {
        await StokAgen.updateOne(
          filter,
          {
            $addToSet: {
              pakets: {
                paket: item.paket,
                jumlah: item.jumlah * multiply,
                stok: item.jumlah * multiply,
              },
            },
          },
          { session: options.session, upsert: true }
        );
      }
    }
  }

  static async updateStokPaketAgen(
    transaksiPaketAgen: TransaksiPaketAgenDoc,
    options: UpdateStokOptions
  ): Promise<void> {
    let multiply =
      transaksiPaketAgen.jenis == JenisTransaksiPaketAgen.PENGEMBALIAN ? 1 : -1;
    if (options.deleted) {
      multiply =
        transaksiPaketAgen.jenis == JenisTransaksiPaketAgen.PENGEMBALIAN
          ? -1
          : 1;
    }

    for (const item of transaksiPaketAgen.items) {
      const filter = {
        agen: transaksiPaketAgen.agen,
        periode: transaksiPaketAgen.periode,
      };

      await StokAgen.updateOne(
        { ...filter, 'pakets.paket': item.paket },
        {
          $inc: {
            'pakets.$.stok': item.jumlah * multiply,
          },
        },
        { session: options.session }
      );
    }
  }
}
