import express, { Request, Response } from 'express'

import { NotFoundError } from '../../common/errors/not-foud-error'
import { requireAuth } from '../../common/middleware/require-auth'
import { URL_SALDO_AGEN } from '../../contants'
import { Periode } from '../../periode/models/periode'
import { SaldoAgen } from '../models/saldo-agen'

const router = express.Router();

router.get(
  `${URL_SALDO_AGEN}`,
  requireAuth,
  async (req: Request, res: Response) => {
    const periode = req.query.periodeId
      ? await Periode.findById(req.query.periodeId)
      : req.currentUser!.periode!;
    if (!periode) throw new NotFoundError();

    const saldoAgen = await SaldoAgen.findOne({
      periode,
    });
    if (!saldoAgen) throw new NotFoundError();

    res.send(saldoAgen);
  }
);

export { router as indexSaldoAgenRouter };
