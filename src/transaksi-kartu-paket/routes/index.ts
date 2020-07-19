import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import { NotFoundError } from '../../common/errors/not-foud-error';
import { requireAuth } from '../../common/middleware/require-auth';
import { URL_TRANSAKSI_KARTU_PAKET } from '../../contants';
import { Periode } from '../../periode/models/periode';
import { TransaksiKartuPaket } from '../models/transaksi-kartu-paket';

const router = express.Router();

router.get(
  `${URL_TRANSAKSI_KARTU_PAKET}`,
  requireAuth,
  async (req: Request, res: Response) => {
    let findQuery = {};
    let pagination = true;
    if (req.query.agenId) {
      findQuery = {
        agen: req.query.agenId,
      };
      pagination = false;
    }
    const { periodeId } = req.query;
    const periode = periodeId
      ? await Periode.findById(periodeId)
      : req.currentUser!.periode;
    if (!periode) {
      throw new NotFoundError();
    }

    const paginateOptions: mongoose.PaginateOptions = {
      sort: { tgl: 1 },
      populate: ['items.kartuPaket'],
      pagination,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 50,
    };

    if (req.query.page) {
      paginateOptions.page = parseInt(req.query.page as string);
    }

    const transaksiKartuPaketList = await TransaksiKartuPaket.paginate(
      { ...findQuery, periode },
      paginateOptions
    );
    res.send(transaksiKartuPaketList);
  }
);

export { router as indexTransaksiKartuPaketRouter };
