import { UpdateStokOptions } from '../../common/dto/update-stok-options'
import { JenisPengaturanPaketAgen } from '../../pengaturan-paket-agen/enums/jenis-pengaturan-paket-agen'
import { PengaturanPaketAgenDoc } from '../../pengaturan-paket-agen/models/pengaturan-paket-agen'
import { StokAgen } from '../models/stok-agen'

export class PaketAgenService {
  static async updateStokPaketAgen(
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
          $inc: { 'pakets.$.jumlah': item.jumlah * multiply },
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
              },
            },
          },
          { session: options.session, upsert: true }
        );
      }
    }
  }
}
