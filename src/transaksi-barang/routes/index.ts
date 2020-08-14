import express, { Request, Response } from 'express';

import { NotFoundError } from '../../common/errors/not-foud-error';
import { requireAuth } from '../../common/middleware/require-auth';
import { URL_TRANSAKSI_BARANG } from '../../contants';
import { Periode } from '../../periode/models/periode';
import { PeriodeAktif } from '../../periode/services/periode-aktif';
import { TransaksiBarang } from '../models/transaksi-barang';

const router = express.Router();

router.get(
  `${URL_TRANSAKSI_BARANG}`,
  requireAuth,
  async (req: Request, res: Response) => {
    const { periodeId } = req.query;
    const periode = periodeId
      ? await Periode.findById(periodeId)
      : await PeriodeAktif.getPeriodeAktif();
    if (!periode) {
      throw new NotFoundError();
    }

    const transaksiBarangList = await TransaksiBarang.find({
      periode,
    }).populate('items.barang');
    res.send(transaksiBarangList);
  }
);

export { router as indexTransaksiBarangRouter };
