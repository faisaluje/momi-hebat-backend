import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import mongoose from 'mongoose'

import { BarangService } from '../../barang/services/barang'
import { BadRequestError } from '../../common/errors/bad-request-error'
import { requireAuth } from '../../common/middleware/require-auth'
import { validateRequest } from '../../common/middleware/validate-request'
import { URL_JENIS_PAKET } from '../../contants'
import { Periode } from '../../periode/models/periode'
import { JenisPaket, JenisPaketAttrs } from '../models/jenis-paket'

const router = express.Router();

router.post(
  URL_JENIS_PAKET,
  [
    body('nama').notEmpty().withMessage('Nama barang harus diisi'),
    body('barangs').isArray().withMessage('List barang harus diisi'),
  ],
  validateRequest,
  requireAuth,
  async (req: Request, res: Response) => {
    const body: JenisPaketAttrs = req.body;
    const periode = await Periode.findById(req.currentUser!.periode?._id);
    if (!periode) {
      throw new BadRequestError('Periode tidak ditemkan');
    }

    await JenisPaket.createCollection();

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const listBarang = await BarangService.getListBarang(
        body.barangs,
        session
      );
      const jenisPaket = JenisPaket.build({
        ...body,
        barangs: listBarang,
        periode,
      });
      await jenisPaket.save({ session });

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

export { router as newJenisPaketRouter };
