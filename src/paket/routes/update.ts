import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { BadRequestError } from '../../common/errors/bad-request-error';
import { NotFoundError } from '../../common/errors/not-foud-error';
import { requireAuth } from '../../common/middleware/require-auth';
import { validateRequest } from '../../common/middleware/validate-request';
import { URL_PAKET } from '../../contants';
import { Paket, PaketAttrs } from '../models/paket';

const router = express.Router();

router.patch(
  `${URL_PAKET}/:paketId`,
  requireAuth,
  [body('nama').notEmpty().withMessage('Nama paket tidak boleh kosong')],
  validateRequest,
  async (req: Request, res: Response) => {
    const paket = await Paket.findById(req.params.paketId);
    if (!paket) throw new NotFoundError();

    const body: PaketAttrs = req.body;

    if (body.jenisPaket) {
      // @ts-ignore
      delete body.jenisPaket;
    }

    try {
      paket.set({ ...body });
      await paket.save();

      res.status(200).send(paket);
    } catch (e) {
      console.error(e);
      throw new BadRequestError(e.message);
    }
  }
);

export { router as updatePaketRouter };
