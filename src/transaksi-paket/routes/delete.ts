import express, { Request, Response } from 'express'
import mongoose from 'mongoose'

import { requireAuth } from '../../common/middleware/require-auth'
import { URL_TRANSAKSI_PAKET } from '../../contants'
import { TransaksiPaketService } from '../services/transaksi-paket'

const router = express.Router();

router.delete(
  `${URL_TRANSAKSI_PAKET}/:transaksiPaketId`,
  requireAuth,
  async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    await TransaksiPaketService.deleteTransaksiPaket(
      req.params.transaksiPaketId,
      session
    );

    await session.commitTransaction();
    session.endSession();

    res.status(204).send();
  }
);

export { router as deleteTransaksiPaketRouter };
