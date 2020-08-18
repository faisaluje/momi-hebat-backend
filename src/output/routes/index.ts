import express, { Request, Response } from 'express'

import { OutputTransaksiKartuPaketService } from '../services/output-transaksi-kartu-paket'

const router = express.Router();

router.get(
  '/api/output/transaksi-kartu-paket/:transaksiKartuPaketId',
  async (req: Request, res: Response) => {
    const pdf = await OutputTransaksiKartuPaketService.getPdf(
      req.params.transaksiKartuPaketId
    );

    res.contentType('application/pdf');
    res.send(pdf);
  }
);

export { router as indexOutputRouter };
