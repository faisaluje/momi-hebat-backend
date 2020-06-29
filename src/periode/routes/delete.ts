import express, { Request, Response } from 'express';
import { requireAuth } from '../../common/middleware/require-auth';
import { URL_PERIODE } from '../../contants';
import { Periode } from '../models/periode';
import { NotFoundError } from '../../common/errors/not-foud-error';

const router = express.Router();

router.delete(
  `${URL_PERIODE}/:periodeId`,
  requireAuth,
  async (req: Request, res: Response) => {
    const periode = await Periode.findById(req.params.periodeId);
    if (!periode) {
      throw new NotFoundError();
    }

    await periode.delete(req.currentUser?.id);

    res.status(204).send();
  }
);

export { router as deletePeriodeRouter };
