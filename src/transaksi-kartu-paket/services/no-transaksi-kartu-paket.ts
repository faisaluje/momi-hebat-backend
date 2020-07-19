import { JenisTransaksi } from '../../common/enums/jenis-transaksi';
import { PeriodeDoc } from '../../periode/models/periode';
import {
  TransaksiKartuPaket,
  TransaksiKartuPaketAttrs,
} from '../models/transaksi-kartu-paket';

export class NoTransaksiKartuPaket {
  static async getCountTransaksiKartuPaket(
    jenis: JenisTransaksi,
    periode: PeriodeDoc
  ): Promise<number> {
    const countTransaksiKartuPaket = await TransaksiKartuPaket.countWithDeleted(
      { periode, jenis }
    );

    return countTransaksiKartuPaket;
  }

  static async generateNoTransaksi(
    data: TransaksiKartuPaketAttrs
  ): Promise<string> {
    const countTransaksiKartuPaket = await this.getCountTransaksiKartuPaket(
      data.jenis,
      data.periode
    );

    const noTransaksiKartuPaket = `TKP/${data.jenis[0].toUpperCase()}/${new Date(
      data.tgl
    ).getFullYear()}/${countTransaksiKartuPaket + 1}`;
    return noTransaksiKartuPaket;
  }
}
