import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import mongoose from 'mongoose'

import { JenisTransaksi } from '../../common/enums/jenis-transaksi'
import { requireAuth } from '../../common/middleware/require-auth'
import { validateRequest } from '../../common/middleware/validate-request'
import { URL_TRANSAKSI_KARTU_PAKET } from '../../contants'
import { TransaksiKartuPaketAttrs } from '../models/transaksi-kartu-paket'
import { TransaksiKartuPaketService } from '../services/transaksi-kartu-paket'

const router = express.Router();

router.post(
  URL_TRANSAKSI_KARTU_PAKET,
  requireAuth,
  [
    body('tgl')
      .notEmpty()
      .withMessage('Tanggal transaksi harus berupa tanggal'),
    body('jenis')
      .isIn([JenisTransaksi.MASUK, JenisTransaksi.KELUAR])
      .withMessage('Jenis transaksi salah'),
    body('periode').isEmpty().withMessage('Periode tidak bisa dipilih'),
    body('items').notEmpty().withMessage('Barang belum diisi'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const body: TransaksiKartuPaketAttrs = req.body;
    const session = await mongoose.startSession();
    session.startTransaction();

    const transaksiKartuPaket = await TransaksiKartuPaketService.createTransaksiKartuPaket(
      body,
      session
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).send(transaksiKartuPaket);
  }
);

export { router as newTransaksiKartuPaketRouter };
