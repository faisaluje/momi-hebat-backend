import express, { Request, Response } from 'express'
import mongoose from 'mongoose'

import { BadRequestError } from '../../common/errors/bad-request-error'
import { NotFoundError } from '../../common/errors/not-foud-error'
import { requireAuth } from '../../common/middleware/require-auth'
import { URL_TRANSAKSI_PAKET } from '../../contants'
import { StokPaketService } from '../../stok-paket/services/stok-paket'
import { TransaksiPaket } from '../models/transaksi-paket'

const router = express.Router();

router.delete(
  `${URL_TRANSAKSI_PAKET}/:transaksiPaketId`,
  requireAuth,
  async (req: Request, res: Response) => {
    const transaksiPaket = await TransaksiPaket.findById(
      req.params.transaksiPaketId
    );
    if (!transaksiPaket) throw new NotFoundError();

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      transaksiPaket.$session(session);
      await transaksiPaket.delete(req.currentUser!.id);
      await StokPaketService.upsertStokPaket(transaksiPaket, {
        deleted: true,
        session,
      });

      await session.commitTransaction();
      session.endSession();
    } catch (e) {
      console.error(e);
      await session.abortTransaction();
      session.endSession();
      throw new BadRequestError('Gagal menghapus transaksi');
    }

    res.status(204).send();
  }
);

export { router as deleteTransaksiPaketRouter };
