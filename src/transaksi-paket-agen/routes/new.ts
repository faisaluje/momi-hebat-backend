import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';

import { requireAuth } from '../../common/middleware/require-auth';
import { validateRequest } from '../../common/middleware/validate-request';
import { URL_TRANSAKSI_PAKET_AGEN } from '../../contants';
import { TransaksiPaketAgenAttrs } from '../models/transaksi-paket-agen';
import { TransaksiPaketAgenService } from '../services/transaksi-paket-agen';

const router = express.Router();

router.post(
  URL_TRANSAKSI_PAKET_AGEN,
  requireAuth,
  [
    body('tgl').notEmpty().withMessage('Format tanggal salah'),
    body('jenis').notEmpty().withMessage('Jenis harus diisi'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const body: TransaksiPaketAgenAttrs = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const transaksiPaketAgen = await TransaksiPaketAgenService.createTransaksiPaketAgen(
        body,
        session
      );

      await session.commitTransaction();
      session.endSession();

      res.status(201).send(transaksiPaketAgen);
    } catch (e) {
      console.error(e.message);
      await session.abortTransaction();
      session.endSession();

      throw e;
    }
  }
);

export { router as newTransaksiPaketAgenRouter };
