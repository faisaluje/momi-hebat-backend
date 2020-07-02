import express, { Request, Response } from 'express';
import { URL_AGEN } from '../../contants';
import { requireAuth } from '../../common/middleware/require-auth';
import { NotFoundError } from '../../common/errors/not-foud-error';
import { BadRequestError } from '../../common/errors/bad-request-error';
import { Agen } from '../models/agen';
import { NoAgen } from '../services/no-agen';

const router = express.Router();

router.patch(
  `${URL_AGEN}/:agenId`,
  requireAuth,
  async (req: Request, res: Response) => {
    const agen = await Agen.findById(req.params.agenId);
    if (!agen) throw new NotFoundError();
    if (agen.topAgen && agen.topAgen._id !== req.body.topAgen?._id) {
      const no = await NoAgen.generateNoAgen(agen.topAgen);
      agen.no = no;
    }
    agen.set({ ...req.body });

    try {
      await agen.save();
      res.status(200).send(agen);
    } catch (e) {
      console.error(e);
      throw new BadRequestError(e.message);
    }
  }
);

export { router as updateAgenRouter };
