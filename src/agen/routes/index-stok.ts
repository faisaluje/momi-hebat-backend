import express, { Request, Response } from 'express'

import { NotFoundError } from '../../common/errors/not-foud-error'
import { requireAuth } from '../../common/middleware/require-auth'
import { URL_AGEN } from '../../contants'
import { Agen } from '../models/agen'
import { StokAgen } from '../models/stok-agen'

const router = express.Router();

router.get(
  `${URL_AGEN}/stok/:agenId`,
  requireAuth,
  async (req: Request, res: Response) => {
    const agen = await Agen.findById(req.params.agenId);
    if (!agen) throw new NotFoundError();

    const stokAgen = await StokAgen.findOne({ agen });
    if (!stokAgen) throw new NotFoundError();

    res.send(stokAgen);
  }
);

router.get(
  `${URL_AGEN}/stok`,
  requireAuth,
  async (_req: Request, res: Response) => {
    const stokList = await Agen.find({});

    res.send(stokList);
  }
);

export { router as indexStokAgenRouter };
