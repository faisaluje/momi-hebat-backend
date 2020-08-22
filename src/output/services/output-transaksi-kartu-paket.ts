import * as fs from 'fs'
import Handlebars from 'handlebars'
import { sumBy } from 'lodash'
import moment from 'moment'

import { NotFoundError } from '../../common/errors/not-foud-error'
import { TransaksiKartuPaketDoc } from '../../transaksi-kartu-paket/models/transaksi-kartu-paket'
import { TransaksiKartuPaketService } from '../../transaksi-kartu-paket/services/transaksi-kartu-paket'
import { OutputInvoice } from './output-invoice'
import { PdfService } from './pdf'

export class OutputTransaksiKartuPaketService {
  static getHtml(transaksiKartuPaket: TransaksiKartuPaketDoc) {
    OutputInvoice.generateTemplate();

    const content = fs.readFileSync(
      'templates/invoice-transaksi-kartu-paket.hbs',
      'utf-8'
    );

    const template = Handlebars.compile(content);
    const context = transaksiKartuPaket.toObject();

    return template(
      {
        ...context,
        tgl: context.tgl
          ? moment(context.tgl).utcOffset(7).format('D MMMM YYYY')
          : '',
        jenis:
          context.jenis === 'masuk'
            ? context.agen
              ? 'Pengembalian Kartu Paket'
              : 'Kartu Paket Stok Masuk'
            : 'Pengambilan Kartu Paket',
        total: sumBy(context.items, 'jumlah'),
      },
      {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true,
      }
    );
  }

  static async getPdf(transaksiKartuPaketId: string): Promise<Buffer> {
    const transaksiKartuPaket = await TransaksiKartuPaketService.getTransaksiKartuPaketOne(
      transaksiKartuPaketId
    );
    if (!transaksiKartuPaket) {
      throw new NotFoundError();
    }

    const html = this.getHtml(transaksiKartuPaket);
    const pdf = await PdfService.generatePdf(html, {
      width: '215mm',
      height: '140mm',
    });

    return pdf;
  }
}
