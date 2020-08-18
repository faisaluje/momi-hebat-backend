import * as fs from 'fs'
import Handlebars from 'handlebars'
import { startCase, sumBy } from 'lodash'
import moment from 'moment'

import { NotFoundError } from '../../common/errors/not-foud-error'
import { TransaksiBarangDoc } from '../../transaksi-barang/models/transaksi-barang'
import { TransaksiBarangService } from '../../transaksi-barang/services/transaksi-barang'
import { OutputInvoice } from './output-invoice'
import { PdfService } from './pdf'

export class OutputTransaksiBarangService {
  static getHtml(transaksiBarang: TransaksiBarangDoc) {
    OutputInvoice.generateTemplate();

    const content = fs.readFileSync(
      'templates/invoice-transaksi-barang.hbs',
      'utf-8'
    );

    const template = Handlebars.compile(content);
    const context = transaksiBarang.toObject();

    return template(
      {
        ...context,
        tgl: context.tgl ? moment(context.tgl).format('D MMMM YYYY') : '',
        jenis: `Barang ${startCase(context.jenis)}`,
        total: sumBy(context.items, 'biaya'),
      },
      {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true,
      }
    );
  }

  static async getPdf(transaksiBarangId: string): Promise<Buffer> {
    const transaksiBarang = await TransaksiBarangService.getTransaksiBarangOne(
      transaksiBarangId
    );
    if (!transaksiBarang) {
      throw new NotFoundError();
    }

    const html = this.getHtml(transaksiBarang);
    const pdf = await PdfService.generatePdf(html, {
      width: '215mm',
      height: '140mm',
    });

    return pdf;
  }
}
