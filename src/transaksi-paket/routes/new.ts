import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import mongoose from 'mongoose'

import { Agen } from '../../agen/models/agen'
import { BadRequestError } from '../../common/errors/bad-request-error'
import { NotFoundError } from '../../common/errors/not-foud-error'
import { requireAuth } from '../../common/middleware/require-auth'
import { validateRequest } from '../../common/middleware/validate-request'
import { URL_TRANSAKSI_PAKET } from '../../contants'
import { Periode } from '../../periode/models/periode'
import { StokPaketService } from '../../stok-paket/services/stok-paket'
import { TransaksiPaket, TransaksiPaketAttrs } from '../models/transaksi-paket'
import { NoTransaksiPaket } from '../services/no-transaksi-paket'
import { PaketsService } from '../services/pakets'

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
    const periode = await Periode.findById(req.currentUser?.periode?._id);
    if (!periode) throw new NotFoundError();

    const noTransaksiPaket = await NoTransaksiPaket.generateNoTransaksi({
      ...body,
      periode,
    });

    const session = await mongoose.startSession();
    session.startTransaction();

    await TransaksiPaket.createCollection();

    const pakets = await PaketsService.getPakets(body.pakets);
    const transaksiPaket = TransaksiPaket.build({
      ...body,
      no: noTransaksiPaket,
      periode,
      pakets,
    });

    if (body.agen) {
      const agen = await Agen.findById(body.agen.id);
      transaksiPaket.set({ agen });
    }

    try {
      await transaksiPaket.save({ session });
      await StokPaketService.upsertStokPaket(transaksiPaket, { session });

      await session.commitTransaction();
      session.endSession();
      res.status(201).send(transaksiPaket);
    } catch (e) {
      console.error(e);
      await session.abortTransaction();
      session.endSession();
      throw new BadRequestError('Gagal menyimpan transaksi');
    }
  }
);

export { router as newTransasiPaketRouter };
