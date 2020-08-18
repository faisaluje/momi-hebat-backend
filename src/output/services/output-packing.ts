import * as fs from 'fs'
import Handlebars from 'handlebars'
import { sumBy } from 'lodash'
import moment from 'moment'
import { join } from 'path'

import { NotFoundError } from '../../common/errors/not-foud-error'
import { PackingDoc } from '../../packing/models/packing'
import { PackingService } from '../../packing/services/packing'
import { OutputInvoice } from './output-invoice'
import { PdfService } from './pdf'

const dirPath = join(__dirname, '..', 'templates');

export class OutputPackingService {
  static getHtml(packing: PackingDoc) {
    OutputInvoice.generateTemplate();

    const content = fs.readFileSync(`${dirPath}/invoice-packing.hbs`, 'utf-8');

    const template = Handlebars.compile(content);
    const context = packing.toObject();

    return template(
      {
        ...context,
        tgl: context.tgl ? moment(context.tgl).format('D MMMM YYYY') : '',
        no: 'Packing',
        total: sumBy(
          context.proses,
          (val: any) => val.jumlah * val.jenisPaket.biayaPacking
        ),
      },
      {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true,
      }
    );
  }

  static async getPdf(packingId: string): Promise<Buffer> {
    const packing = await PackingService.getPackingOne(packingId);
    if (!packing) {
      throw new NotFoundError();
    }

    const html = this.getHtml(packing);
    const pdf = await PdfService.generatePdf(html, {
      width: '215mm',
      height: '140mm',
    });

    return pdf;
  }
}
