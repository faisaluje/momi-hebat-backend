import express, { Request, Response } from 'express'

import { NotFoundError } from '../../common/errors/not-foud-error'
import { requireAuth } from '../../common/middleware/require-auth'
import { URL_PACKING } from '../../contants'
import { Periode } from '../../periode/models/periode'
import { Packing } from '../models/packing'

const router = express.Router();

router.get(URL_PACKING, requireAuth, async (req: Request, res: Response) => {
  const periode = req.query.periodeId
    ? await Periode.findById(req.query.periodeId)
    : req.currentUser!.periode!;
  if (!periode) throw new NotFoundError();

  const packing = await Packing.find({ periode })
    .populate('proses.karyawan')
    .populate('proses.jenisPaket');

  res.send(packing);
});

export { router as indexPackingRouter };
