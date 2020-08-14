import express, { Request, Response } from 'express';
import moment from 'moment';

import { Agen } from '../../agen/models/agen';
import { NotFoundError } from '../../common/errors/not-foud-error';
import { requireAuth } from '../../common/middleware/require-auth';
import { URL_TRANSAKSI_SALDO } from '../../contants';
import { Periode } from '../../periode/models/periode';
import { PeriodeAktif } from '../../periode/services/periode-aktif';
import { TransaksiSaldo } from '../models/transaksi-saldo';

const router = express.Router();

router.get(
  `${URL_TRANSAKSI_SALDO}/:agenId`,
  requireAuth,
  async (req: Request, res: Response) => {
    const { agenId } = req.params;
    const { periodeId } = req.query;
    const agen = await Agen.findById(agenId);
    const periode = periodeId
      ? await Periode.findById(periodeId)
      : await PeriodeAktif.getPeriodeAktif();
    if (!agen || !periode) {
      throw new NotFoundError();
    }

    const transaksiSaldoList = await TransaksiSaldo.find({
      agen,
      periode,
    }).sort({ tgl: 1, createdAt: 1 });
    res.send(transaksiSaldoList);
  }
);

router.get(
  `${URL_TRANSAKSI_SALDO}/`,
  requireAuth,
  async (req: Request, res: Response) => {
    const { periodeId } = req.query;
    const dateFirst = req.query.dateFirst;
    const dateLast = req.query.dateLast;
    const periode = periodeId
      ? await Periode.findById(periodeId)
      : await PeriodeAktif.getPeriodeAktif();
    if (!periode || !dateFirst || !dateLast) {
      throw new NotFoundError();
    }

    let findConditions = {};

    if (req.query.agen) {
      findConditions = {
        agen: req.query.agen,
      };
    }

    const transaksiSaldoList = await TransaksiSaldo.find({
      periode,
      tgl: {
        $gte: new Date(dateFirst.toString()),
        $lte: new Date(dateLast.toString()),
      },
      ...findConditions,
    })
      .sort({
        tgl: 1,
        createdAt: 1,
      })
      .populate('agen');
    res.send(transaksiSaldoList);
  }
);

export { router as indexTransaksiSaldoRouter };
