import express, { Request, Response } from 'express';

import { NotFoundError } from '../../common/errors/not-foud-error';
import { requireAuth } from '../../common/middleware/require-auth';
import { URL_JENIS_PAKET } from '../../contants';
import { Periode } from '../../periode/models/periode';
import { PeriodeAktif } from '../../periode/services/periode-aktif';
import { JenisPaketStatus } from '../enums/jenis-paket-status';
import { JenisPaket } from '../models/jenis-paket';

const router = express.Router();

router.get(
  URL_JENIS_PAKET,
  requireAuth,
  async (req: Request, res: Response) => {
    let findQuery = {};
    if (req.query.status !== 'all') {
      findQuery = {
        status:
          (req.query.status as JenisPaketStatus) || JenisPaketStatus.AKTIF,
      };
    }

    const { periodeId } = req.query;
    const periode = periodeId
      ? await Periode.findById(periodeId)
      : await PeriodeAktif.getPeriodeAktif();
    if (!periode) {
      throw new NotFoundError();
    }

    const jenisPaketList = await JenisPaket.find({
      ...findQuery,
      periode,
    })
      .populate('barangs.barang')
      .sort({ createdAt: 1 });

    res.send(jenisPaketList);
  }
);

export { router as indexJenisPaketRouter };
