import terbilang from 'angka-menjadi-terbilang'
import * as fs from 'fs'
import Handlebars from 'handlebars'
import { startCase } from 'lodash'
import moment from 'moment'

import { NotFoundError } from '../../common/errors/not-foud-error'
import { TransaksiSaldoDoc } from '../../transaksi-saldo/models/transaksi-saldo'
import { TransaksiSaldoService } from '../../transaksi-saldo/services/transaksi-saldo'
import { OutputInvoice } from './output-invoice'
import { PdfService } from './pdf'

export class OutputTransaksiSaldoService {
  static getHtml(transaksiSaldo: TransaksiSaldoDoc) {
    OutputInvoice.generateTemplate();

    const content = fs.readFileSync(
      'templates/invoice-transaksi-saldo.hbs',
      'utf-8'
    );

    const template = Handlebars.compile(content);
    const context = transaksiSaldo.toObject();

    return template(
      {
        ...context,
        kategori: `${
          context?.kategori === 'paket'
            ? context?.jenis === 'keluar'
              ? 'Booking '
              : 'Cancel '
            : ''
        }
          ${
            context?.kategori === 'cashback'
              ? context?.jenis === 'keluar'
                ? 'Pengemblian '
                : 'Penerimaan '
              : ''
          }
          ${startCase(context?.kategori)}`,
        via: context.via
          ? `${context.via} ${
              context.via === 'transfer'
                ? `${context.namaBank || ''} ${
                    context.atasNama ? `a.n. ${context.atasNama}` : ''
                  }`
                : ''
            }`
          : null,
        tgl: context.tgl
          ? moment(context.tgl).utcOffset(7).format('D MMMM YYYY')
          : '',
        jenis: 'Saldo',
        terbilang: startCase(`${terbilang(context?.nominal)} rupiah`),
      },
      {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true,
      }
    );
  }

  static async getPdf(transaksiSaldoId: string): Promise<Buffer> {
    const transaksiSaldo = await TransaksiSaldoService.getTransaksiSaldoOne(
      transaksiSaldoId
    );
    if (!transaksiSaldo) {
      throw new NotFoundError();
    }

    const html = this.getHtml(transaksiSaldo);
    const pdf = await PdfService.generatePdf(html, {
      width: '210mm',
      height: '180mm',
    });

    return pdf;
  }
}
