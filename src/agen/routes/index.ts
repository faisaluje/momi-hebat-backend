import express, { Request, Response } from 'express';
import { requireAuth } from '../../common/middleware/require-auth';
import { URL_AGEN } from '../../contants';
import { Agen } from '../models/agen';
import { AgenStatus } from '../enums/agen-status';

const router = express.Router();

router.get(URL_AGEN, requireAuth, async (req: Request, res: Response) => {
  const status = (req.query.status as AgenStatus) || AgenStatus.AKTIF;
  const agenList = await Agen.find({ status })
    .populate('topAgen')
    .populate('subAgens');

  res.send(agenList);
});

export { router as indexAgenRouter };
