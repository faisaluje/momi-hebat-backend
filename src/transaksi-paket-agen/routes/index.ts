import express, { Request, Response } from 'express'
import { FilterQuery } from 'mongoose'

import { NotFoundError } from '../../common/errors/not-foud-error'
import { requireAuth } from '../../common/middleware/require-auth'
import { URL_TRANSAKSI_PAKET_AGEN } from '../../contants'
import { Periode } from '../../periode/models/periode'
import { TransaksiPaketAgen, TransaksiPaketAgenDoc } from '../models/transaksi-paket-agen'

const router = express.Router();

router.get(
  `${URL_TRANSAKSI_PAKET_AGEN}`,
  requireAuth,
  async (req: Request, res: Response) => {
    const { periodeId } = req.query;
    const periode = periodeId
      ? await Periode.findById(periodeId)
      : req.currentUser!.periode;
    if (!periode) {
      throw new NotFoundError();
    }

    let filter: FilterQuery<TransaksiPaketAgenDoc> = { periode };
    if (req.query.agen) {
      filter.agen = req.query.agen as any;
    }

    const transaksiPaketAgen = await TransaksiPaketAgen.find(filter).sort({
      tgl: 1,
    });

    res.send(transaksiPaketAgen);
  }
);

export { router as indexTransaksiPaketAgenRouter };
