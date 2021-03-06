import * as pdf from 'html-pdf'

import { PdfOptions } from '../dtos/pdfOptions'

export class PdfService {
  static async generatePdf(
    html: string,
    _pdfOptions: PdfOptions
  ): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      pdf
        .create(html, {
          orientation: 'portrait',
          format: 'A4',
        })
        .toBuffer((err, result) => {
          if (err) return reject(err);

          return resolve(result);
        });
    });
  }
}
