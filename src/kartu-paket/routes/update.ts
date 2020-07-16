import express, { Request, Response } from 'express'
import { body } from 'express-validator'

import { BadRequestError } from '../../common/errors/bad-request-error'
import { NotFoundError } from '../../common/errors/not-foud-error'
import { requireAuth } from '../../common/middleware/require-auth'
import { validateRequest } from '../../common/middleware/validate-request'
import { URL_KARTU_PAKET } from '../../contants'
import { KartuPaket } from '../models/kartu-paket'

const router = express.Router();

router.patch(
  `${URL_KARTU_PAKET}/:kartuPaketId`,
  requireAuth,
  [body('nama').notEmpty().withMessage('Nama Kartu Paket tidak boleh kosong')],
  validateRequest,
  async (req: Request, res: Response) => {
    const kartuPaket = await KartuPaket.findById(req.params.kartuPaketId);
    if (!kartuPaket) throw new NotFoundError();

    kartuPaket.set({ nama: req.body.nama });

    try {
      await kartuPaket.save();
      res.status(200).send(kartuPaket);
    } catch (e) {
      console.error(e);
      throw new BadRequestError(e.message);
    }
  }
);

export { router as updateKartuPaketRouter };
