import express, { Request, Response } from 'express';
import { Pengguna } from '../models/pengguna';
import { requireAuth } from '../../common/middleware/require-auth';
import { URL_PENGGUNA } from '../../contants';
import { PenggunaPeran } from '../enums/pengguna-peran';

const router = express.Router();

router.get(URL_PENGGUNA, requireAuth, async (_req: Request, res: Response) => {
  const penggunaList = await Pengguna.find({ peran: PenggunaPeran.OPERATOR });

  res.send(penggunaList);
});

export { router as indexPenggunaRouter };
