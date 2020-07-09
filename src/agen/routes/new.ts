import express, { Request, Response } from 'express'

import { BadRequestError } from '../../common/errors/bad-request-error'
import { requireAuth } from '../../common/middleware/require-auth'
import { URL_AGEN } from '../../contants'
import { Agen, AgenAttrs } from '../models/agen'
import { NoAgen } from '../services/no-agen'

const router = express.Router();

router.post(URL_AGEN, async (req: Request, res: Response) => {
  const body: AgenAttrs = req.body;
  if (!body.topAgen && !body.no) {
    throw new BadRequestError('No. Agen tidak boleh kosong');
  }

  if (body.topAgen) {
    const topAgen = await Agen.findById(body.topAgen.id);
    if (!topAgen) throw new BadRequestError('Agen referal tidak ditemukan');

    const no = await NoAgen.generateNoAgen(topAgen);
    body.no = no;
    body.topAgen = topAgen;
  } else {
    const agneExist = await Agen.findOne({ no: body.no });
    if (agneExist) throw new BadRequestError('No Agen sudah digunakan');
  }

  const agen = Agen.build(body);
  await agen.save();

  res.status(201).send(agen);
});

export { router as newAgenRouter };
