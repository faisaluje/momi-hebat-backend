import express, { Request, Response } from 'express';
import { URL_BARANG } from '../../contants';
import { requireAuth } from '../../common/middleware/require-auth';
import { body } from 'express-validator';
import { validateRequest } from '../../common/middleware/validate-request';
import { Barang } from '../models/barang';

const router = express.Router();

router.post(
  URL_BARANG,
  requireAuth,
  [body('nama').notEmpty().withMessage('Nama barang tidak boleh kosong')],
  validateRequest,
  async (req: Request, res: Response) => {
    const barang = Barang.build(req.body);
    await barang.save();

    res.status(201).send(barang);
  }
);

export { router as newBarangRouter };
