import { TransaksiPaketAgen, TransaksiPaketAgenAttrs } from '../models/transaksi-paket-agen'

export class NoTransaksiPaketAgen {
  static async getCountTransaksiPaketAgen(
    data: TransaksiPaketAgenAttrs
  ): Promise<number> {
    const countTransaksiPaketAgen = await TransaksiPaketAgen.countWithDeleted({
      periode: data.periode,
      jenis: data.jenis,
    });

    return countTransaksiPaketAgen;
  }

  static async generateNoTransaksi(
    data: TransaksiPaketAgenAttrs
  ): Promise<string> {
    const countTransaksiPaketAgen = await this.getCountTransaksiPaketAgen(data);

    const noTransaksiPaketAgen = `TPA/${data.jenis[0].toUpperCase()}/${new Date(
      data.tgl
    ).getFullYear()}/${countTransaksiPaketAgen + 1}`;
    return noTransaksiPaketAgen;
  }
}
