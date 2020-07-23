import { ClientSession } from 'mongoose'

import { StokAgen } from '../../agen/models/stok-agen'
import { BonusPaketAgenService } from '../../agen/services/bonus-paket-agen'
import { PaketAgenService } from '../../agen/services/paket-agen'
import { JenisTransaksi } from '../../common/enums/jenis-transaksi'
import { BadRequestError } from '../../common/errors/bad-request-error'
import { PeriodeDoc } from '../../periode/models/periode'
import { PeriodeAktif } from '../../periode/services/periode-aktif'
import { TransaksiKategori as TransaksiPaketKagetori } from '../../transaksi-paket/enums/transaksi-kategori'
import { TransaksiPaketAttrs } from '../../transaksi-paket/models/transaksi-paket'
import { TransaksiPaketService } from '../../transaksi-paket/services/transaksi-paket'
import { TransaksiKategori } from '../../transaksi-saldo/enums/transaksi-kategori'
import { TransaksiSaldoAttrs } from '../../transaksi-saldo/models/transaksi-saldo'
import { TransaksiSaldoService } from '../../transaksi-saldo/services/transaksi-saldo'
import { JenisNominal } from '../enums/jenis-nominal'
import { JenisPengaturanPaketAgen } from '../enums/jenis-pengaturan-paket-agen'
import { PengaturanPaketAgen, PengaturanPaketAgenAttrs, PengaturanPaketAgenDoc } from '../models/pengaturan-paket-agen'
import { NoPengaturanPaketAgenService } from './no-pengaturan-paket-agen'

export class PengaturanPaketAgenService {
  static calculateBiayaPaket(
    data: PengaturanPaketAgenDoc,
    jenisNominal: JenisNominal
  ): number {
    let nominal = 0;
    for (const item of data.items) {
      nominal += item.paket[jenisNominal] * item.jumlah;
    }

    return nominal;
  }

  static async createTransaksiSaldo(
    data: PengaturanPaketAgenDoc,
    periode: PeriodeDoc,
    kategoriPengaturan: TransaksiKategori,
    session?: ClientSession
  ): Promise<void> {
    let nominal = 0;
    let jenis = JenisTransaksi.KELUAR;
    let kategori = TransaksiKategori.PAKET;

    if (data.jenis === JenisPengaturanPaketAgen.BOOKING) {
      nominal = this.calculateBiayaPaket(data, JenisNominal.HARGA);
      jenis = JenisTransaksi.KELUAR;
      kategori = TransaksiKategori.PAKET;
      if (kategoriPengaturan === TransaksiKategori.CASHBACK) {
        nominal = this.calculateBiayaPaket(data, JenisNominal.CASHBACK);
        jenis = JenisTransaksi.MASUK;
        kategori = TransaksiKategori.CASHBACK;
      }
    }

    if (data.jenis === JenisPengaturanPaketAgen.CANCEL) {
      nominal = this.calculateBiayaPaket(data, JenisNominal.HARGA);
      jenis = JenisTransaksi.MASUK;
      kategori = TransaksiKategori.PAKET;
      if (kategoriPengaturan === TransaksiKategori.CASHBACK) {
        nominal = this.calculateBiayaPaket(data, JenisNominal.CASHBACK);
        jenis = JenisTransaksi.KELUAR;
        kategori = TransaksiKategori.PAKET;
      }
    }

    let totalJumlahPaket = 0;
    data.items.forEach((item) => {
      totalJumlahPaket += item.jumlah;
    });

    const transaksiSaldo: TransaksiSaldoAttrs = {
      tgl: data.tgl,
      jenis,
      catatan: `${data.jenis} ${totalJumlahPaket} paket`,
      agen: data.agen,
      kategori,
      nominal,
      periode,
    };

    await TransaksiSaldoService.createTransaksiSaldo(transaksiSaldo, {
      session,
      periode,
    });
  }

  static async createTransaksiPaket(
    data: PengaturanPaketAgenDoc,
    session: ClientSession
  ): Promise<void> {
    let jumlahTotalPaket = 0;
    const pakets = data.items.map((item) => {
      jumlahTotalPaket += item.jumlah;

      return {
        jenisPaket: item.paket.jenisPaket as any,
        jumlah: item.jumlah,
      };
    });

    const transaksiPaket: TransaksiPaketAttrs = {
      tgl: data.tgl,
      jenis:
        data.jenis === JenisPengaturanPaketAgen.BOOKING
          ? JenisTransaksi.KELUAR
          : JenisTransaksi.MASUK,
      kategori:
        data.jenis === JenisPengaturanPaketAgen.BOOKING
          ? TransaksiPaketKagetori.BOOKING
          : TransaksiPaketKagetori.CANCEL,
      agen: data.agen as any,
      pakets,
      catatan: `${data.jenis} ${jumlahTotalPaket} paket agen ${data.agen.diri.nama.lengkap}`,
      periode: data.periode,
    };

    await TransaksiPaketService.createTransaksiPaket(transaksiPaket, session);
  }

  static async createPengaturanPaketAgen(
    data: PengaturanPaketAgenAttrs,
    session: ClientSession
  ): Promise<void> {
    const periode = await PeriodeAktif.getPeriodeAktif();
    if (!periode) throw new BadRequestError('Periode tidak ditemukan');

    await PengaturanPaketAgen.createCollection();

    const noPengaturanPaketAgen = await NoPengaturanPaketAgenService.generateNoPengaturanPaketAgen(
      {
        ...data,
        periode: periode._id,
      }
    );

    const pengaturanPaketAgen = PengaturanPaketAgen.build({
      ...data,
      no: noPengaturanPaketAgen,
      periode: periode._id,
    });

    await pengaturanPaketAgen.save({ session });
    await pengaturanPaketAgen
      .populate('agen')
      .populate('items.paket')
      .execPopulate();

    await this.createTransaksiSaldo(
      pengaturanPaketAgen,
      periode,
      TransaksiKategori.PAKET,
      session
    );
    await this.createTransaksiSaldo(
      pengaturanPaketAgen,
      periode,
      TransaksiKategori.CASHBACK,
      session
    );
    await this.createTransaksiPaket(pengaturanPaketAgen, session);

    await PaketAgenService.updateStokPaketAgen(pengaturanPaketAgen, {
      session,
    });

    const stokAgen = await StokAgen.findOne({
      agen: pengaturanPaketAgen.agen,
    }).session(session);
    if (!stokAgen) throw new BadRequestError('Stok Agen tidak ditemukan');

    await BonusPaketAgenService.calculateTotalBonus(stokAgen, { session });
  }
}
