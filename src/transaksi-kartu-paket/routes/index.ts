import express, { Request, Response } from 'express'

import { NotFoundError } from '../../common/errors/not-foud-error'
import { requireAuth } from '../../common/middleware/require-auth'
import { URL_TRANSAKSI_KARTU_PAKET } from '../../contants'
import { Periode } from '../../periode/models/periode'
import { TransaksiKartuPaket } from '../models/transaksi-kartu-paket'

const router = express.Router();

router.get(
  `${URL_TRANSAKSI_KARTU_PAKET}`,
  requireAuth,
  async (req: Request, res: Response) => {
    const { periodeId } = req.query;
    const periode = periodeId
      ? await Periode.findById(periodeId)
      : req.currentUser!.periode;
    if (!periode) {
      throw new NotFoundError();
    }

    const transaksiKartuPaketList = await TransaksiKartuPaket.find({
      periode,
    }).populate('items.kartuPaket');
    res.send(transaksiKartuPaketList);
  }
);

export { router as indexTransaksiKartuPaketRouter };
