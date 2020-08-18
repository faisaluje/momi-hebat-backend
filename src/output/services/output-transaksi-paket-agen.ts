import * as fs from 'fs'
import Handlebars from 'handlebars'
import { startCase, sumBy } from 'lodash'
import moment from 'moment'
import { join } from 'path'

import { NotFoundError } from '../../common/errors/not-foud-error'
import { TransaksiPaketAgenDoc } from '../../transaksi-paket-agen/models/transaksi-paket-agen'
import { TransaksiPaketAgenService } from '../../transaksi-paket-agen/services/transaksi-paket-agen'
import { OutputInvoice } from './output-invoice'
import { PdfService } from './pdf'

const dirPath = join(__dirname, '..', 'templates');

export class OutputTransaksiPaketAgenService {
  static getHtml(transaksiPaketAgen: TransaksiPaketAgenDoc) {
    OutputInvoice.generateTemplate();

    const content = fs.readFileSync(
      `${dirPath}/invoice-transaksi-paket-agen.hbs`,
      'utf-8'
    );

    const template = Handlebars.compile(content);
    const context = transaksiPaketAgen.toObject();

    return template(
      {
        ...context,
        tgl: context.tgl ? moment(context.tgl).format('D MMMM YYYY') : '',
        jenis: startCase(context.jenis),
        total: sumBy(context.items, 'jumlah'),
        no: 'Paket',
      },
      {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true,
      }
    );
  }

  static async getPdf(transaksiPaketAgenId: string): Promise<Buffer> {
    const transaksiPaketAgen = await TransaksiPaketAgenService.getTransaksiPaketAgenOne(
      transaksiPaketAgenId
    );
    if (!transaksiPaketAgen) {
      throw new NotFoundError();
    }

    const html = this.getHtml(transaksiPaketAgen);
    const pdf = await PdfService.generatePdf(html, {
      width: '215mm',
      height: '140mm',
    });

    return pdf;
  }
}
