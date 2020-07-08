import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import mongoose from 'mongoose'

import { Agen } from '../../agen/models/agen'
import { JenisTransaksi } from '../../common/enums/jenis-transaksi'
import { BadRequestError } from '../../common/errors/bad-request-error'
import { NotFoundError } from '../../common/errors/not-foud-error'
import { requireAuth } from '../../common/middleware/require-auth'
import { validateRequest } from '../../common/middleware/validate-request'
import { URL_TRANSAKSI_SALDO } from '../../contants'
import { Periode } from '../../periode/models/periode'
import { SaldoAgen } from '../../saldo-agen/models/saldo-agen'
import { Saldo } from '../../saldo-agen/services/saldo'
import { TransaksiSaldo, TransaksiSaldoAttrs } from '../models/transaksi-saldo'

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
    const agen = await Agen.findById(body.agen.id);
    const periode = await Periode.findById(req.currentUser?.periode?._id);
    if (!agen || !periode) {
      throw new NotFoundError();
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    const transaksiSaldo = TransaksiSaldo.build({
      ...body,
      agen,
      periode,
    });

    try {
      await transaksiSaldo.save({ session });
      const saldoAgen = await Saldo.getSaldoByPeriode(periode);

      const currentSaldo = saldoAgen.saldo.find(
        (saldo) => saldo.agen == agen.id
      );
      if (!currentSaldo) {
        saldoAgen.saldo.push({
          agen: agen,
          jumlah:
            transaksiSaldo.jenis === JenisTransaksi.MASUK
              ? transaksiSaldo.nominal
              : transaksiSaldo.nominal * -1,
          bonus: 0,
          updatedAt: new Date(),
        });
      } else {
        if (transaksiSaldo.jenis === JenisTransaksi.MASUK) {
          currentSaldo.jumlah += transaksiSaldo.nominal;
        } else {
          currentSaldo.jumlah -= transaksiSaldo.nominal;
        }
      }

      await saldoAgen.save({ session });
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
