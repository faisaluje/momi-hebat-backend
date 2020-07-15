import express, { Request, Response } from 'express'
import { body } from 'express-validator'

import { BadRequestError } from '../../common/errors/bad-request-error'
import { NotFoundError } from '../../common/errors/not-foud-error'
import { requireAuth } from '../../common/middleware/require-auth'
import { validateRequest } from '../../common/middleware/validate-request'
import { URL_KARYAWAN } from '../../contants'
import { Karyawan } from '../models/karyawan'

const router = express.Router();

router.patch(
  `${URL_KARYAWAN}/:karyawanId`,
  requireAuth,
  [
    body('no').isEmpty().withMessage('No Karyawan tidak bisa dirubah'),
    body('nama').notEmpty().withMessage('Nama tidak boleh kosong'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const karyawan = await Karyawan.findById(req.params.karyawanId);
    if (!karyawan) throw new NotFoundError();

    karyawan.set({ ...req.body });

    try {
      await karyawan.save();
      res.status(200).send(karyawan);
    } catch (e) {
      console.error(e);
      throw new BadRequestError(e.message);
    }
  }
);

export { router as updateKaryawanRouter };
