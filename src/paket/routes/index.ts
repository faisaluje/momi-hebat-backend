import express, { Request, Response } from 'express';

import { NotFoundError } from '../../common/errors/not-foud-error';
import { requireAuth } from '../../common/middleware/require-auth';
import { URL_PAKET } from '../../contants';
import { Periode } from '../../periode/models/periode';
import { Paket } from '../models/paket';

const router = express.Router();

router.get(URL_PAKET, requireAuth, async (req: Request, res: Response) => {
  const { periodeId } = req.query;
  const periode = periodeId
    ? await Periode.findById(periodeId)
    : req.currentUser!.periode;
  if (!periode) {
    throw new NotFoundError();
  }

  const paketList = await Paket.find({
    'jenisPaket.periode': periodeId,
  }).populate('JenisPaket');

  res.send(paketList);
});

export { router as indexPaketRouter };
