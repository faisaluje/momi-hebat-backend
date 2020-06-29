import express, { Request, Response } from 'express';
import { URL_KARYAWAN } from '../../contants';
import { requireAuth } from '../../common/middleware/require-auth';
import { body } from 'express-validator';
import { validateRequest } from '../../common/middleware/validate-request';
import { Karyawan } from '../models/karyawan';

const router = express.Router();

router.post(
  URL_KARYAWAN,
  requireAuth,
  [
    body('nama').notEmpty().withMessage('Nama tidak boleh kosong'),
    body('noHp').optional().isNumeric().withMessage('No. HP harus angka semua'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const karyawan = Karyawan.build(req.body);
    await karyawan.save();

    res.status(201).send(karyawan);
  }
);

export { router as newKaryawanRouter };
