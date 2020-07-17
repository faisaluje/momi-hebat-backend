import express, { Request, Response } from 'express'
import mongoose from 'mongoose'

import { SaldoAgenService } from '../../agen/services/saldo-agen'
import { BadRequestError } from '../../common/errors/bad-request-error'
import { NotFoundError } from '../../common/errors/not-foud-error'
import { requireAuth } from '../../common/middleware/require-auth'
import { URL_TRANSAKSI_SALDO } from '../../contants'
import { TransaksiSaldo } from '../models/transaksi-saldo'

const router = express.Router();

router.delete(
  `${URL_TRANSAKSI_SALDO}/:transaksiSaldoId`,
  requireAuth,
  async (req: Request, res: Response) => {
    const transaksiSaldo = await TransaksiSaldo.findById(
      req.params.transaksiSaldoId
    )
      .populate('agen')
      .populate('periode');
    if (!transaksiSaldo) throw new NotFoundError();

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      transaksiSaldo.$session(session);
      await transaksiSaldo.delete(req.currentUser!.id);
      await SaldoAgenService.upsertSaldoAgen(transaksiSaldo, {
        session,
        deleted: true,
      });

      await session.commitTransaction();
      session.endSession();
    } catch (e) {
      console.error(e);
      await session.abortTransaction();
      session.endSession();
      throw new BadRequestError('Gagal menghapus transaksi');
    }

    res.status(204).send();
  }
);

export { router as deleteTransaksiSaldoRouter };
