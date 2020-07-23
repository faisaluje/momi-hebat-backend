import { UpdateStokOptions } from '../../common/dto/update-stok-options'
import { NotFoundError } from '../../common/errors/not-foud-error'
import { compareObjectId } from '../../utils'
import { StokAgen, StokAgenDoc } from '../models/stok-agen'

export class BonusPaketAgenService {
  static async calculateTotalBonus(
    stokAgen: StokAgenDoc,
    options?: UpdateStokOptions
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

    await stokAgen.save({ session: options?.session });
  }

  static async updateBonusAgen(
    stokAgen: StokAgenDoc,
    options?: UpdateStokOptions
  ): Promise<StokAgenDoc> {
    const stokAgenExisting = await StokAgen.findOne({
      agen: stokAgen.agen,
      periode: stokAgen.periode,
    });
    if (!stokAgenExisting) throw new NotFoundError();

    stokAgenExisting.set({
      bonusPakets: stokAgen.bonusPakets,
    });

    await stokAgenExisting.save({ session: options?.session });

    return stokAgenExisting;
  }
}
