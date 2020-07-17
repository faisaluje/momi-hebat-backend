import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import mongoose from 'mongoose'

import { Agen } from '../../agen/models/agen'
import { SaldoAgenService } from '../../agen/services/saldo-agen'
import { BadRequestError } from '../../common/errors/bad-request-error'
import { NotFoundError } from '../../common/errors/not-foud-error'
import { requireAuth } from '../../common/middleware/require-auth'
import { validateRequest } from '../../common/middleware/validate-request'
import { URL_TRANSAKSI_SALDO } from '../../contants'
import { Periode } from '../../periode/models/periode'
import { TransaksiSaldo, TransaksiSaldoAttrs } from '../models/transaksi-saldo'
import { NoTransaksiSaldo } from '../services/no-transaksi-saldo'

const router = express.Router();

router.post(
  URL_TRANSAKSI_SALDO,
  requireAuth,
  [
    body('tgl').notEmpty().withMessage('Format tanggal salah'),
    body('agen').notEmpty().withMessage('Agen belum dipilih'),
    body('nominal').isNumeric().withMessage('Nominal harus angka'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const body: TransaksiSaldoAttrs = req.body;
    const agen = await Agen.findById(body.agen.id);
    const periode = await Periode.findById(req.currentUser?.periode?._id);
    if (!agen || !periode) {
      throw new NotFoundError();
    }

    const noTransaksiSaldo = await NoTransaksiSaldo.generateNoTransaksi({
      ...body,
      agen,
      periode,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    const transaksiSaldo = TransaksiSaldo.build({
      ...body,
      no: noTransaksiSaldo,
      agen,
      periode,
    });

    try {
      await transaksiSaldo.save({ session });
      await SaldoAgenService.upsertSaldoAgen(transaksiSaldo, { session });

      await session.commitTransaction();
      session.endSession();
      res.status(201).send(transaksiSaldo);
    } catch (e) {
      console.error(e);
      await session.abortTransaction();
      session.endSession();
      throw new BadRequestError('Gagal menyimpan transaksi');
    }
  }
);

export { router as newTransaksiSaldoRouter };
