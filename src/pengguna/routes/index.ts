import express, { Request, Response } from 'express';
import { Pengguna } from '../models/pengguna';
import { requireAuth } from '../../common/middleware/require-auth';

const router = express.Router();

router.get(
  '/api/pengguna',
  requireAuth,
  async (_req: Request, res: Response) => {
    const pengguna = await Pengguna.find({});

    res.send(pengguna);
  }
);

export { router as indexPenggunaRouter };
