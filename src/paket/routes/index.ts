import express, { Request, Response } from 'express';

import { NotFoundError } from '../../common/errors/not-foud-error';
import { requireAuth } from '../../common/middleware/require-auth';
import { URL_PAKET } from '../../contants';
import { Periode } from '../../periode/models/periode';
import { PeriodeAktif } from '../../periode/services/periode-aktif';
import { PaketStatus } from '../enums/paket-status';
import { Paket } from '../models/paket';

const router = express.Router();

router.get(URL_PAKET, requireAuth, async (req: Request, res: Response) => {
  const { periodeId } = req.query;
  const periode = periodeId
    ? await Periode.findById(periodeId)
    : await PeriodeAktif.getPeriodeAktif();
  if (!periode) {
    throw new NotFoundError();
  }

  const paketList = await Paket.aggregate([
    {
      $lookup: {
        from: 'jenispakets',
        localField: 'jenisPaket',
        foreignField: '_id',
        as: 'jenisPaket',
      },
    },
    {
      $match: {
        $and: [
          { status: (req.query.status as PaketStatus) || PaketStatus.AKTIF },
          { 'jenisPaket.periode': periode._id },
        ],
      },
    },
    { $unwind: '$jenisPaket' },
    { $addFields: { id: '$_id' } },
    { $project: { 'jenisPaket.barangs': 0 } },
  ]);

  res.send(paketList);
});

export { router as indexPaketRouter };
