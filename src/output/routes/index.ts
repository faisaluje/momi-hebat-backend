import express, { Request, Response } from 'express'

import { OutputTransaksiBarangService } from '../services/output-transaksi-barang'
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

router.get(
  '/api/output/transaksi-barang/:transaksiBarangId',
  async (req: Request, res: Response) => {
    const pdf = await OutputTransaksiBarangService.getPdf(
      req.params.transaksiBarangId
    );

    res.contentType('application/pdf');
    res.send(pdf);
  }
);

export { router as indexOutputRouter };
