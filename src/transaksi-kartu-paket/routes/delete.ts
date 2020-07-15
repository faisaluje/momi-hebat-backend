import express, { Request, Response } from 'express'
import mongoose from 'mongoose'

import { requireAuth } from '../../common/middleware/require-auth'
import { URL_TRANSAKSI_KARTU_PAKET } from '../../contants'
import { TransaksiKartuPaketService } from '../services/transaksi-kartu-paket'

const router = express.Router();

router.delete(
  `${URL_TRANSAKSI_KARTU_PAKET}/:transaksiKartuPaketId`,
  requireAuth,
  async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    await TransaksiKartuPaketService.deleteTransaksiKartuPaket(
      req.params.transaksiKartuPaketId,
      session
    );

    await session.commitTransaction();
    session.endSession();

    res.status(204).send();
  }
);

export { router as deleteTransaksiKartuPaketRouter };
