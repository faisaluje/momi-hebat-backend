import express, { Request, Response } from 'express';
import { URL_TRANSAKSI_SALDO } from '../../contants';
import { requireAuth } from '../../common/middleware/require-auth';
import { TransaksiSaldoAttrs } from '../models/transaksi-saldo';
import { validateRequest } from '../../common/middleware/validate-request';
import { body } from 'express-validator';

const router = express.Router();

router.post(
  URL_TRANSAKSI_SALDO,
  requireAuth,
  [
    body('tgl').isDate().withMessage('Format tanggal salah'),
    body('agen').notEmpty().withMessage('Agen belum dipilih'),
    body('nominal').isNumeric().withMessage('Nominal harus angka'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const body: TransaksiSaldoAttrs = req.body;
  }
);
