import express, { Request, Response } from 'express';
import { requireAuth } from '../../common/middleware/require-auth';
import { URL_AGEN } from '../../contants';
import { Agen } from '../models/agen';

const router = express.Router();

router.get(URL_AGEN, requireAuth, async (_req: Request, res: Response) => {
  const agenList = await Agen.find({}).populate('topAgen');

  res.send(agenList);
});

export { router as indexAgenRouter };
