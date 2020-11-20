import { JenisTransaksi } from '../../common/enums/jenis-transaksi'
import { PeriodeDoc } from '../../periode/models/periode'
import { TransaksiBarang, TransaksiBarangAttrs } from '../models/transaksi-barang'

export class NoTransaksiBarang {
  static async getCountTransaksiBarang(
    jenis: JenisTransaksi,
    periode: PeriodeDoc
  ): Promise<number> {
    const countTransaksiBarang = await TransaksiBarang.countWithDeleted({
      periode,
      jenis,
    });

    return countTransaksiBarang;
  }

  static async generateNoTransaksi(
    data: TransaksiBarangAttrs
  ): Promise<string> {
    const countTransaksiBarang = await this.getCountTransaksiBarang(
      data.jenis,
      data.periode
    );

    const noTransaksiBarang = `TB/${data.jenis[0].toUpperCase()}/${new Date(
      data.tgl
    ).getFullYear()}/${countTransaksiBarang + 1}`;
    return noTransaksiBarang;
  }
}
