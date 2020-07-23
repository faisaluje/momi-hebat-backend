import { PengaturanPaketAgen, PengaturanPaketAgenAttrs } from '../models/pengaturan-paket-agen'

export class NoPengaturanPaketAgenService {
  static async getCountPengaturanPaketAgen(
    data: PengaturanPaketAgenAttrs
  ): Promise<number> {
    const countPengaturanPaketAgen = await PengaturanPaketAgen.countWithDeleted(
      {
        periode: data.periode,
        agen: data.agen,
      }
    );

    return countPengaturanPaketAgen;
  }

  static async generateNoPengaturanPaketAgen(
    data: PengaturanPaketAgenAttrs
  ): Promise<string> {
    const countPengaturanPaketAgen = await this.getCountPengaturanPaketAgen(
      data
    );
    const noPengaturanPaketAgen = `PPA/${data.jenis[0].toUpperCase()}/${new Date(
      data.tgl
    ).getFullYear()}/${countPengaturanPaketAgen + 1}`;

    return noPengaturanPaketAgen;
  }
}
