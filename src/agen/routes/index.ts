import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import { NotFoundError } from '../../common/errors/not-foud-error';
import { requireAuth } from '../../common/middleware/require-auth';
import { URL_AGEN } from '../../contants';
import { PeriodeAktif } from '../../periode/services/periode-aktif';
import { AgenStatus } from '../enums/agen-status';
import { Agen } from '../models/agen';

const router = express.Router();

router.get(
  `${URL_AGEN}/:agenId`,
  requireAuth,
  async (req: Request, res: Response) => {
    const agen = await Agen.findById(req.params.agenId)
      .populate({ path: 'topAgen', select: 'no diri.nama' })
      .populate({ path: 'subAgens', select: 'no diri.nama -topAgen' })
      .populate('stok');
    if (!agen) throw new NotFoundError();

    res.send(agen);
  }
);

router.get(URL_AGEN, requireAuth, async (req: Request, res: Response) => {
  const periodeAktif = await PeriodeAktif.getPeriodeAktif();
  let findQuery = {};

  if (req.query.status !== 'all') {
    findQuery = {
      ...findQuery,
      status: (req.query.status as AgenStatus) || AgenStatus.AKTIF,
    };
  }

  if (req.query.level) {
    findQuery = {
      ...findQuery,
      level: req.query.level as string,
    };
  }

  if (req.query.nama) {
    findQuery = {
      ...findQuery,
      'diri.nama.lengkap': {
        $regex: new RegExp(req.query.nama as string, 'is'),
      },
    };
  }

  const paginateOptions: mongoose.PaginateOptions = {
    sort: { level: 1, createdAt: 1 },
    populate: [
      { path: 'topAgen', select: 'no diri.nama' },
      {
        path: 'subAgens',
        match: { status: AgenStatus.AKTIF },
        select: 'no diri.nama -topAgen',
      },
      { path: 'stok', match: { periode: periodeAktif?._id } },
    ],
    limit: req.query.limit ? parseInt(req.query.limit as string) : 50,
  };

  if (!req.query.detail) {
    delete paginateOptions.populate;
  }

  if (req.query.page) {
    paginateOptions.page = parseInt(req.query.page as string);
  }

  const agenList = await Agen.paginate(findQuery, paginateOptions);

  res.send(agenList);
});

export { router as indexAgenRouter };
