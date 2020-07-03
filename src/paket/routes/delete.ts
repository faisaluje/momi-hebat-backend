import express, { Request, Response } from 'express';
import { URL_PAKET } from '../../contants';
import { requireAuth } from '../../common/middleware/require-auth';
import { NotFoundError } from '../../common/errors/not-foud-error';
import { Paket } from '../models/paket';

const router = express.Router();

router.delete(
  `${URL_PAKET}/:paketId`,
  requireAuth,
  async (req: Request, res: Response) => {
    const paket = await Paket.findById(req.params.paketId);
    if (!paket) throw new NotFoundError();

    await paket.delete(req.currentUser?.id);
    res.status(204).send();
  }
);

export { router as deletePaketRouter };
