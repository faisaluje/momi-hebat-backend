import express, { Request, Response } from 'express'
import mongoose from 'mongoose'

import { BadRequestError } from '../../common/errors/bad-request-error'
import { NotFoundError } from '../../common/errors/not-foud-error'
import { requireAuth } from '../../common/middleware/require-auth'
import { URL_TRANSAKSI_BARANG } from '../../contants'
import { StokBarangService } from '../../stok-barang/services/stok-barang'
import { TransaksiBarang } from '../models/transaksi-barang'

const router = express.Router();

router.delete(
  `${URL_TRANSAKSI_BARANG}/:transaksiBarangId`,
  requireAuth,
  async (req: Request, res: Response) => {
    const transaksiBarang = await TransaksiBarang.findById(
      req.params.transaksiBarangId
    );
    if (!transaksiBarang) throw new NotFoundError();

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      transaksiBarang.$session(session);
      await transaksiBarang.delete(req.currentUser!.id);
      await StokBarangService.upsertStokBarang(transaksiBarang, {
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

export { router as deleteTransaksiBarangRouter };
