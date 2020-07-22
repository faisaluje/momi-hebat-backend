import { UpdateStokOptions } from '../../common/dto/update-stok-options'
import { compareObjectId } from '../../utils'
import { StokAgenDoc } from '../models/stok-agen'

export class BonusPaketAgenService {
  static async calculateTotalBonus(
    stokAgen: StokAgenDoc,
    options: UpdateStokOptions
  ): Promise<void> {
    stokAgen.totalBonus = 0;

    if (stokAgen.pakets) {
      for (const item of stokAgen.pakets) {
        const bonusPaket = stokAgen.bonusPakets.find((bonus) =>
          compareObjectId(bonus.paket, item.paket)
        );
        if (bonusPaket) {
          stokAgen.totalBonus += (bonusPaket.nominal || 0) * (item.jumlah || 0);
        }
      }
    }

    await stokAgen.save({ session: options.session });
  }
}
