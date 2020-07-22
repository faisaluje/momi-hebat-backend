import express, { Request, Response } from 'express'
import mongoose from 'mongoose'

import { BadRequestError } from '../../common/errors/bad-request-error'
import { NotFoundError } from '../../common/errors/not-foud-error'
import { requireAuth } from '../../common/middleware/require-auth'
import { URL_AGEN } from '../../contants'
import { Agen, AgenDoc } from '../models/agen'
import { BonusPaketAgenService } from '../services/bonus-paket-agen'
import { NoAgen } from '../services/no-agen'
import { StokAgenService } from '../services/stok-agen'

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

router.patch(`${URL_AGEN}/stok/:agenId`, requireAuth, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const result = await StokAgenService.updateStokAgen(req.body, { session });
    if (!result) {
      console.log(result);

      throw new Error('Stok agen tidak ditemukan');
    }

    await BonusPaketAgenService.calculateTotalBonus(result, { session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).send({});
  } catch (e) {
    console.error(e);
    await session.abortTransaction();
    session.endSession();
    throw new BadRequestError('Gagal menyimpan');
  }
});

export { router as updateAgenRouter };
