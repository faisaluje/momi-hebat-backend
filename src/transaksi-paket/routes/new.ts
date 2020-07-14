import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import mongoose from 'mongoose'

import { requireAuth } from '../../common/middleware/require-auth'
import { validateRequest } from '../../common/middleware/validate-request'
import { URL_TRANSAKSI_PAKET } from '../../contants'
import { TransaksiPaketAttrs } from '../models/transaksi-paket'
import { TransaksiPaketService } from '../services/transaksi-paket'

const router = express.Router();

router.post(
  URL_TRANSAKSI_PAKET,
  requireAuth,
  [
    body('tgl').notEmpty().withMessage('Format tanggal salah'),
    body('kategori').notEmpty().withMessage('Kategori harus diisi'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const body: TransaksiPaketAttrs = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    const transaksiPaket = await TransaksiPaketService.createTransaksiPaket(
      body,
      session
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).send(transaksiPaket);
  }
);

export { router as newTransasiPaketRouter };
