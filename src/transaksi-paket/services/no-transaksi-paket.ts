import { TransaksiPaket, TransaksiPaketAttrs } from '../models/transaksi-paket'

export class NoTransaksiPaket {
  static async getCountTransaksiSaldo(
    data: TransaksiPaketAttrs
  ): Promise<number> {
    const countTransaksiSaldo = await TransaksiPaket.countWithDeleted({
      periode: data.periode,
      jenis: data.jenis,
      kategori: data.kategori,
    });

    return countTransaksiSaldo;
  }

  static async generateNoTransaksi(data: TransaksiPaketAttrs): Promise<string> {
    const countTransaksiPaket = await this.getCountTransaksiSaldo(data);

    const noTransaksiPaket = `TP/${data.jenis[0].toUpperCase()}/${data.kategori[0].toUpperCase()}/${new Date(
      data.tgl
    ).getFullYear()}/${countTransaksiPaket + 1}`;
    return noTransaksiPaket;
  }
}
