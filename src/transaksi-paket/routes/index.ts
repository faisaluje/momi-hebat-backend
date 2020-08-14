import express, { Request, Response } from 'express';

import { NotFoundError } from '../../common/errors/not-foud-error';
import { requireAuth } from '../../common/middleware/require-auth';
import { URL_TRANSAKSI_PAKET } from '../../contants';
import { Periode } from '../../periode/models/periode';
import { PeriodeAktif } from '../../periode/services/periode-aktif';
import { TransaksiPaket } from '../models/transaksi-paket';

const router = express.Router();

router.get(
  `${URL_TRANSAKSI_PAKET}`,
  requireAuth,
  async (req: Request, res: Response) => {
    const { periodeId } = req.query;
    const periode = periodeId
      ? await Periode.findById(periodeId)
      : await PeriodeAktif.getPeriodeAktif();
    if (!periode) {
      throw new NotFoundError();
    }

    const transaksiPaketList = await TransaksiPaket.find({
      periode,
    }).populate('pakets.paket');
    res.send(transaksiPaketList);
  }
);

export { router as indexTransaksiPaketRouter };
