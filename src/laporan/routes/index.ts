import express, { Request, Response } from 'express'
import * as fs from 'fs'
import * as pdf from 'html-pdf'
import { join } from 'path'

const router = express.Router();

router.get('/api/laporan', (req: Request, res: Response) => {
  const html = fs.readFileSync(
    join(__dirname, '..', 'templates/invoices.html'),
    'utf-8'
  );

  pdf
    .create(html, {
      width: '210mm',
      height: '297mm',
    })
    .toBuffer((err, result) => {
      if (err) return console.log(err);

      res.contentType('application/pdf');
      res.send(result);
    });
});

export { router as indexLaporanRouter };
