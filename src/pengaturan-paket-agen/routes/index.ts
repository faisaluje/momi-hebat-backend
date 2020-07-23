import express, { Request, Response } from 'express'

import { NotFoundError } from '../../common/errors/not-foud-error'
import { requireAuth } from '../../common/middleware/require-auth'
import { URL_PENGATURAN_PAKET_AGEN } from '../../contants'
import { Periode } from '../../periode/models/periode'
import { PengaturanPaketAgen } from '../models/pengaturan-paket-agen'

const router = express.Router();

router.get(
  `${URL_PENGATURAN_PAKET_AGEN}/:agenId`,
  requireAuth,
  async (req: Request, res: Response) => {
    const { periodeId } = req.query;
    const periode = periodeId
      ? await Periode.findById(periodeId)
      : req.currentUser!.periode;
    if (!periode) {
      throw new NotFoundError();
    }

    const pengaturanPaketAgen = await PengaturanPaketAgen.find({
      agen: req.params.agenId as any,
      periode,
    }).sort({ tgl: 1, createdAt: 1 });
    res.send(pengaturanPaketAgen);
  }
);

export { router as indexPengaturanPaketAgenRouter };
