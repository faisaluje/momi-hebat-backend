import express, { Request, Response } from 'express';
import { requireAuth } from '../../common/middleware/require-auth';
import { URL_KARYAWAN } from '../../contants';
import { Karyawan } from '../models/karyawan';

const router = express.Router();

router.get(URL_KARYAWAN, requireAuth, async (_req: Request, res: Response) => {
  const karyawanList = await Karyawan.find({});

  res.send(karyawanList);
});

export { router as indexKaryawanRouter };
