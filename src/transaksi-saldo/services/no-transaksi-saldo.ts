import { TransaksiSaldo, TransaksiSaldoAttrs } from '../models/transaksi-saldo'

export class NoTransaksiSaldo {
  static async getCountTransaksiSaldo(
    data: TransaksiSaldoAttrs
  ): Promise<number> {
    const countTransaksiSaldo = await TransaksiSaldo.countDocuments({
      periode: data.periode,
      agen: data.agen,
      jenis: data.jenis,
    });

    return countTransaksiSaldo;
  }

  static async generateNoTransaksi(data: TransaksiSaldoAttrs): Promise<string> {
    const countTransaksiSaldo = await this.getCountTransaksiSaldo(data);

    const noTransaksiSaldo = `TS/${data.jenis[0].toUpperCase()}/${
      data.agen.no
    }/${new Date(data.tgl).getFullYear()}/${countTransaksiSaldo + 1}`;
    return noTransaksiSaldo;
  }
}
