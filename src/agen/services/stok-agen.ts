import { NotFoundError } from '../../common/errors/not-foud-error'
import { PeriodeAktif } from '../../periode/services/periode-aktif'
import { StokAgen, StokAgenDoc } from '../models/stok-agen'

export class StokAgenService {
  static async getStokAgen(agenId: any, periodeId?: any): Promise<StokAgenDoc> {
    const periode = periodeId || (await PeriodeAktif.getPeriodeAktif());
    const stokAgen = await StokAgen.findOne({
      agen: agenId,
      periode,
    });
    if (!stokAgen) throw new NotFoundError();

    return stokAgen;
  }
}
