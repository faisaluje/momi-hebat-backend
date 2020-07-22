import { UpdateStokOptions } from '../../common/dto/update-stok-options'
import { NotFoundError } from '../../common/errors/not-foud-error'
import { StokAgen, StokAgenDoc } from '../models/stok-agen'

export class StokAgenService {
  static async updateStokAgen(
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
