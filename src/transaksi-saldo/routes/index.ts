import express, { Request, Response } from 'express'

import { Agen } from '../../agen/models/agen'
import { NotFoundError } from '../../common/errors/not-foud-error'
import { requireAuth } from '../../common/middleware/require-auth'
import { URL_TRANSAKSI_SALDO } from '../../contants'
import { Periode } from '../../periode/models/periode'
import { TransaksiSaldo } from '../models/transaksi-saldo'

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
      : req.currentUser!.periode;
    if (!agen || !periode) {
      throw new NotFoundError();
    }

    const transaksiSaldoList = await TransaksiSaldo.find({
      agen,
      periode,
    });
    res.send(transaksiSaldoList);
  }
);

export { router as indexTransaksiSaldoRouter };
