import express, { Request, Response } from 'express'

import { NotFoundError } from '../../common/errors/not-foud-error'
import { requireAuth } from '../../common/middleware/require-auth'
import { URL_AGEN } from '../../contants'
import { AgenStatus } from '../enums/agen-status'
import { Agen } from '../models/agen'

const router = express.Router();

router.get(
  `${URL_AGEN}/:agenId`,
  requireAuth,
  async (req: Request, res: Response) => {
    const agen = await Agen.findById(req.params.agenId)
      .populate('topAgen')
      .populate('subAgens');
    if (!agen) throw new NotFoundError();

    res.send(agen);
  }
);

router.get(URL_AGEN, requireAuth, async (req: Request, res: Response) => {
  const status = (req.query.status as AgenStatus) || AgenStatus.AKTIF;
  const agenList = await Agen.find({ status })
    .populate('topAgen')
    .populate('subAgens');

  res.send(agenList);
});

export { router as indexAgenRouter };
