import express, { Request, Response } from 'express'

import { requireAuth } from '../../common/middleware/require-auth'
import { URL_KARYAWAN } from '../../contants'
import { KaryawanStatus } from '../enums/karyawan-status'
import { Karyawan } from '../models/karyawan'

const router = express.Router();

router.get(URL_KARYAWAN, requireAuth, async (req: Request, res: Response) => {
  let findQuery = {};
  if (req.query.status !== 'all') {
    findQuery = {
      status: (req.query.status as KaryawanStatus) || KaryawanStatus.AKTIF,
    };
  }

  const karyawanList = await Karyawan.find(findQuery);

  res.send(karyawanList);
});

export { router as indexKaryawanRouter };
