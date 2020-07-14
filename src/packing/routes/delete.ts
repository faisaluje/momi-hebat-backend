import express, { Request, Response } from 'express'
import mongoose from 'mongoose'

import { BadRequestError } from '../../common/errors/bad-request-error'
import { NotFoundError } from '../../common/errors/not-foud-error'
import { requireAuth } from '../../common/middleware/require-auth'
import { URL_PACKING } from '../../contants'
import { TransaksiBarangService } from '../../transaksi-barang/services/transaksi-barang'
import { TransaksiPaketService } from '../../transaksi-paket/services/transaksi-paket'
import { Packing } from '../models/packing'

const router = express.Router();

router.delete(
  `${URL_PACKING}/:packingId`,
  requireAuth,
  async (req: Request, res: Response) => {
    const packing = await Packing.findById(req.params.packingId);
    if (!packing) throw new NotFoundError();

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      packing.$session(session);
      await packing.delete();
      await TransaksiPaketService.deleteTransaksiPaket(
        packing.transaksiPaket._id,
        session
      );
      await TransaksiBarangService.deleteTransaksiBarang(
        packing.transaksiBarang._id,
        session
      );

      await session.commitTransaction();
      session.endSession();
    } catch (e) {
      console.error(e);
      await session.abortTransaction();
      session.endSession();
      throw new BadRequestError('Gagal menghapus packing');
    }

    res.status(204).send();
  }
);

export { router as deletePackingRouter };
