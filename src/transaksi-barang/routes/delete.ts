import express, { Request, Response } from 'express'
import mongoose from 'mongoose'

import { requireAuth } from '../../common/middleware/require-auth'
import { URL_TRANSAKSI_BARANG } from '../../contants'
import { TransaksiBarangService } from '../services/transaksi-barang'

const router = express.Router();

router.delete(
  `${URL_TRANSAKSI_BARANG}/:transaksiBarangId`,
  requireAuth,
  async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    await TransaksiBarangService.deleteTransaksiBarang(
      req.params.transaksiBarangId,
      session
    );

    await session.commitTransaction();
    session.endSession();

    res.status(204).send();
  }
);

export { router as deleteTransaksiBarangRouter };
