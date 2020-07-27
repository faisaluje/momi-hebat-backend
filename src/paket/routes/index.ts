import express, { Request, Response } from 'express';

import { NotFoundError } from '../../common/errors/not-foud-error';
import { requireAuth } from '../../common/middleware/require-auth';
import { URL_PAKET } from '../../contants';
import { Periode } from '../../periode/models/periode';
import { PaketStatus } from '../enums/paket-status';
import { Paket } from '../models/paket';

const router = express.Router();

router.get(URL_PAKET, requireAuth, async (req: Request, res: Response) => {
  let findQuery = {};
  if (req.query.status !== 'all') {
    findQuery = {
      status: (req.query.status as PaketStatus) || PaketStatus.AKTIF,
    };
  }
  const { periodeId } = req.query;
  const periode = periodeId
    ? await Periode.findById(periodeId)
    : req.currentUser!.periode;
  if (!periode) {
    throw new NotFoundError();
  }

  findQuery = {
    ...findQuery,
    'jenisPaket.periode': periodeId,
  };

  const paketList = await Paket.find(findQuery)
    .populate({
      path: 'jenisPaket',
      select: '-barangs',
    })
    .sort({ 'jenisPaket.createdAt': 1, createdAt: 1 });

  res.send(paketList);
});

export { router as indexPaketRouter };
