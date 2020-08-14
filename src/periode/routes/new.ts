import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';

import { requireAuth } from '../../common/middleware/require-auth';
import { validateRequest } from '../../common/middleware/validate-request';
import { URL_PERIODE } from '../../contants';
import { JenisPaketService } from '../../jenis-paket/services/jenis-paket';
import { KartuPaketService } from '../../kartu-paket/services/kartu-paket';
import { Periode } from '../models/periode';

const router = express.Router();

router.post(
  URL_PERIODE,
  requireAuth,
  [
    body('nama').notEmpty().withMessage('Nama tidak boleh kosong'),
    body('tglMulai')
      .isDate()
      .notEmpty()
      .withMessage('Tanggal mulai tidak boleh kosong'),
    body('tglBerakhir')
      .isDate()
      .notEmpty()
      .custom((value, { req }) => value >= req.body.tglMulai)
      .withMessage(
        'Tanggal berakhir tidak boleh kosong & tidak boleh kecil dari tanggal mulai'
      ),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const periode = Periode.build(req.body);
      await periode.save({ session });

      await KartuPaketService.generateKartuPakets(periode, session);
      await JenisPaketService.generateJenisPakets(periode, session);

      await session.commitTransaction();
      session.endSession();

      res.status(201).send(periode);
    } catch (e) {
      console.error(e.message);
      await session.abortTransaction();
      session.endSession();

      throw e;
    }
  }
);

export { router as newPeriodeRouter };
