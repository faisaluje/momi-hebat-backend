import express, { Request, Response } from 'express'
import mongoose from 'mongoose'

import { BadRequestError } from '../../common/errors/bad-request-error'
import { requireAuth } from '../../common/middleware/require-auth'
import { URL_PENGATURAN_PAKET_AGEN } from '../../contants'
import { PengaturanPaketAgenAttrs } from '../models/pengaturan-paket-agen'
import { PengaturanPaketAgenService } from '../services/pengaturan-paket-agen'

const router = express.Router();

router.post(
  URL_PENGATURAN_PAKET_AGEN,
  requireAuth,
  async (req: Request, res: Response) => {
    const body: PengaturanPaketAgenAttrs = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const pengaturanPaketAgen = await PengaturanPaketAgenService.createPengaturanPaketAgen(
        body,
        session
      );

      await session.commitTransaction();
      session.endSession();
      res.status(201).send(pengaturanPaketAgen);
    } catch (e) {
      console.error(e);
      await session.abortTransaction();
      session.endSession();
      throw new BadRequestError('Gagal menyimpan pengaturan paket');
    }
  }
);

export { router as newPengaturanPaketAgenRouter };
