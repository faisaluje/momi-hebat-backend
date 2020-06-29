import express, { Request, Response } from 'express';
import { requireAuth } from '../../common/middleware/require-auth';
import { URL_PERIODE } from '../../contants';
import { Periode } from '../models/periode';

const router = express.Router();

router.get(URL_PERIODE, requireAuth, async (_req: Request, res: Response) => {
  const periodeList = await Periode.find({});

  res.send(periodeList);
});

export { router as indexPeriodeRouter };
