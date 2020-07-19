import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { requireAuth } from '../../common/middleware/require-auth';
import { validateRequest } from '../../common/middleware/validate-request';
import { URL_PAKET } from '../../contants';
import { Paket, PaketAttrs } from '../models/paket';

const router = express.Router();

router.post(
  URL_PAKET,
  requireAuth,
  [body('nama').notEmpty().withMessage('Nama paket tidak boleh kosong')],
  validateRequest,
  async (req: Request, res: Response) => {
    const body: PaketAttrs = req.body;

    const paket = Paket.build({
      ...body,
    });

    await paket.save();

    res.status(201).send(paket);
  }
);

export { router as newPaketRouter };
