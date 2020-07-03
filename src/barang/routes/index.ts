import express, { Request, Response } from 'express';
import { URL_BARANG } from '../../contants';
import { requireAuth } from '../../common/middleware/require-auth';
import { Barang } from '../models/barang';

const router = express.Router();

router.get(URL_BARANG, requireAuth, async (_req: Request, res: Response) => {
  const barangList = await Barang.find({});
  res.send(barangList);
});

export { router as indexBarangRouter };
