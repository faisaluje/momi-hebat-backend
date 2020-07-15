import express, { Request, Response } from 'express'
import { body } from 'express-validator'

import { requireAuth } from '../../common/middleware/require-auth'
import { validateRequest } from '../../common/middleware/validate-request'
import { URL_KARYAWAN } from '../../contants'
import { Karyawan } from '../models/karyawan'

const router = express.Router();

router.post(
  URL_KARYAWAN,
  requireAuth,
  [body('nama').notEmpty().withMessage('Nama tidak boleh kosong')],
  validateRequest,
  async (req: Request, res: Response) => {
    const karyawan = Karyawan.build(req.body);
    await karyawan.save();

    res.status(201).send(karyawan);
  }
);

export { router as newKaryawanRouter };
