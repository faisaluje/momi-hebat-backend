import express, { Request, Response } from 'express'
import mongoose from 'mongoose'

import { requireAuth } from '../../common/middleware/require-auth'
import { URL_AGEN } from '../../contants'
import { PeriodeAktif } from '../../periode/services/periode-aktif'
import { AgenStatus } from '../enums/agen-status'
import { Agen } from '../models/agen'

const router = express.Router();

router.get(
  `${URL_AGEN}/laporan`,
  requireAuth,
  async (req: Request, res: Response) => {
    let findQuery = {};
    const periodeAktif = await PeriodeAktif.getPeriodeAktif();

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

    const paginateOptions: mongoose.PaginateOptions = {
      pagination: false,
      sort: { level: 1, createdAt: 1 },
      populate: [
        { path: 'topAgen', select: 'no diri.nama' },
        { path: 'stok', match: { periode: periodeAktif?._id } },
      ],
    };

    if (req.query.agenId) {
      findQuery = {
        ...findQuery,
        _id: req.query.agenId as string,
      };

      paginateOptions.populate = [
        ...paginateOptions.populate,
        {
          path: 'subAgens',
          match: { status: AgenStatus.AKTIF },
          select: 'no diri -topAgen',
          options: { sort: { createdAt: 1 } },
          populate: [
            {
              path: 'subAgens',
              match: { status: AgenStatus.AKTIF },
              select: 'no diri -topAgen',
              options: { sort: { createdAt: 1 } },
              populate: [
                { path: 'stok', match: { periode: periodeAktif?._id } },
              ],
            },
            { path: 'stok', match: { periode: periodeAktif?._id } },
          ],
        },
      ];
    }

    const agenList = await Agen.paginate(findQuery, paginateOptions);

    res.send(agenList);
  }
);

export { router as laporanAgenRouter };
