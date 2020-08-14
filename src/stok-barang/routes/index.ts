import express, { Request, Response } from 'express';

import { NotFoundError } from '../../common/errors/not-foud-error';
import { requireAuth } from '../../common/middleware/require-auth';
import { URL_STOK_BARANG } from '../../contants';
import { Periode } from '../../periode/models/periode';
import { PeriodeAktif } from '../../periode/services/periode-aktif';
import { StokBarang } from '../models/stok-barang';

const router = express.Router();

router.get(
  `${URL_STOK_BARANG}`,
  requireAuth,
  async (req: Request, res: Response) => {
    const periode = req.query.periodeId
      ? await Periode.findById(req.query.periodeId)
      : await PeriodeAktif.getPeriodeAktif();
    if (!periode) throw new NotFoundError();

    const stokBarang = await StokBarang.find({
      periode,
    }).populate('barang');
    if (!stokBarang) throw new NotFoundError();

    res.send(stokBarang);
  }
);

export { router as indexStokBarangRouter };
