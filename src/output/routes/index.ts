import express, { Request, Response } from 'express';

import { OutputBookingPaketService } from '../services/output-booking-paket';
import { OutputPackingService } from '../services/output-packing';
import { OutputTransaksiBarangService } from '../services/output-transaksi-barang';
import { OutputTransaksiKartuPaketService } from '../services/output-transaksi-kartu-paket';
import { OutputTransaksiPaketAgenService } from '../services/output-transaksi-paket-agen';
import { OutputTransaksiSaldoService } from '../services/output-transaksi-saldo';

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

router.get(
  '/api/output/packing/:packingId',
  async (req: Request, res: Response) => {
    const pdf = await OutputPackingService.getPdf(req.params.packingId);

    res.contentType('application/pdf');
    res.send(pdf);
  }
);

router.get(
  '/api/output/transaksi-paket-agen/:transaksiPaketAgenId',
  async (req: Request, res: Response) => {
    const pdf = await OutputTransaksiPaketAgenService.getPdf(
      req.params.transaksiPaketAgenId
    );

    res.contentType('application/pdf');
    res.send(pdf);
  }
);

router.get(
  '/api/output/transaksi-saldo/:transaksiSaldoId',
  async (req: Request, res: Response) => {
    const pdf = await OutputTransaksiSaldoService.getPdf(
      req.params.transaksiSaldoId
    );

    res.contentType('application/pdf');
    res.send(pdf);
  }
);

router.post(
  '/api/output/booking-paket',
  async (req: Request, res: Response) => {
    const pdf = await OutputBookingPaketService.getPdf(req.body);

    res.contentType('application/pdf');
    res.send(pdf);
  }
);

export { router as indexOutputRouter };
