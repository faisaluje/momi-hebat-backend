import express, { Request, Response } from 'express'
import mongoose from 'mongoose'

import { BadRequestError } from '../../common/errors/bad-request-error'
import { NotFoundError } from '../../common/errors/not-foud-error'
import { requireAuth } from '../../common/middleware/require-auth'
import { URL_AGEN } from '../../contants'
import { Agen, AgenDoc } from '../models/agen'
import { NoAgen } from '../services/no-agen'

const router = express.Router();

router.patch(
  `${URL_AGEN}/:agenId`,
  requireAuth,
  async (req: Request, res: Response) => {
    const body: AgenDoc = req.body;
    const agen = await Agen.findById(req.params.agenId);
    if (!agen) throw new NotFoundError();

    if (body.topAgen) {
      const topAgen = await Agen.findById(body.topAgen.id);
      if (!topAgen) throw new BadRequestError('Agen referal tidak ditemukan');

      if (
        !mongoose.Types.ObjectId(body.topAgen?.id).equals(agen.topAgen?._id)
      ) {
        const no = await NoAgen.generateNoAgen(topAgen);
        body.no = no;
      }

      body.topAgen = topAgen;
    }

    if (!body.topAgen && agen.topAgen) {
      agen.topAgen = null;
    }

    try {
      agen.set({ ...body });
      await agen.save();

      res.status(200).send(agen);
    } catch (e) {
      console.error(e);
      throw new BadRequestError(e.message);
    }
  }
);

export { router as updateAgenRouter };
