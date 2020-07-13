import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import mongoose from 'mongoose'

import { BarangService } from '../../barang/services/barang'
import { BadRequestError } from '../../common/errors/bad-request-error'
import { NotFoundError } from '../../common/errors/not-foud-error'
import { requireAuth } from '../../common/middleware/require-auth'
import { validateRequest } from '../../common/middleware/validate-request'
import { URL_JENIS_PAKET } from '../../contants'
import { JenisPaket } from '../models/jenis-paket'

const router = express.Router();

router.patch(
  `${URL_JENIS_PAKET}/:jenisPaketId`,
  requireAuth,
  [
    body('nama').notEmpty().withMessage('Nama barang harus diisi'),
    body('barangs').isArray().withMessage('List barang harus diisi'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const jenisPaket = await JenisPaket.findById(req.params.jenisPaketId);
    if (!jenisPaket) throw new NotFoundError();

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const listBarang = await BarangService.getListBarang(
        req.body.barangs,
        session
      );

      await JenisPaket.updateOne(
        {
          _id: req.params.jenisPaketId,
        },
        { ...req.body, barangs: listBarang },
        { session }
      );

      await session.commitTransaction();
      session.endSession();
      res.status(201).send(jenisPaket);
    } catch (e) {
      console.error(e);
      await session.abortTransaction();
      session.endSession();
      throw new BadRequestError('Gagal menyimpan jenis paket');
    }
  }
);

export { router as updateJenisPaketRouter };
