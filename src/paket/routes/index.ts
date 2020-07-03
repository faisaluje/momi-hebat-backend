import express, { Request, Response } from 'express';
import { URL_PAKET } from '../../contants';
import { requireAuth } from '../../common/middleware/require-auth';
import { Paket } from '../models/paket';
import { Periode } from '../../periode/models/periode';

const router = express.Router();

router.get(URL_PAKET, requireAuth, async (req: Request, res: Response) => {
  const periode = req.query.periodeId
    ? await Periode.findById(req.query.periodeId)
    : req.currentUser?.periode;

  const paketList = periode
    ? await Paket.find({ periode })
    : await Paket.find({});
  res.send(paketList);
});

export { router as indexPaketRouter };
