import express, { Request, Response } from 'express'
import mongoose from 'mongoose'

import { requireAuth } from '../../common/middleware/require-auth'
import { URL_TRANSAKSI_PAKET_AGEN } from '../../contants'
import { TransaksiPaketAgenService } from '../services/transaksi-paket-agen'

const router = express.Router();

router.delete(
  `${URL_TRANSAKSI_PAKET_AGEN}/:transaksiPaketAgenId`,
  requireAuth,
  async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await TransaksiPaketAgenService.deleteTransaksiPaketAgen(
        req.params.transaksiPaketAgenId,
        session
      );

      await session.commitTransaction();
      session.endSession();

      res.status(204).send();
    } catch (e) {
      console.error(e.message);
      await session.abortTransaction();
      session.endSession();
    }
  }
);

export { router as deleteTransaksiPaketAgenRouter };
