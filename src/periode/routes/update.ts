import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../common/middleware/validate-request';
import { BadRequestError } from '../../common/errors/bad-request-error';
import { requireAuth } from '../../common/middleware/require-auth';
import { NotFoundError } from '../../common/errors/not-foud-error';
import { URL_PERIODE } from '../../contants';
import { Periode } from '../models/periode';
import { PeriodeAktif } from '../services/periode-aktif';

const router = express.Router();

router.patch(
  `${URL_PERIODE}/:periodeId`,
  requireAuth,
  [
    body('nama').notEmpty().withMessage('Nama tidak boleh kosong'),
    body('tglMulai')
      .isDate()
      .notEmpty()
      .withMessage('Tanggal mulai tidak boleh kosong'),
    body('tglBerakhir')
      .isDate()
      .notEmpty()
      .custom((value, { req }) => value >= req.body.tglMulai)
      .withMessage(
        'Tanggal berakhir tidak boleh kosong & tidak boleh kecil dari tanggal mulai'
      ),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const periode = await Periode.findById(req.params.periodeId);
    if (!periode) throw new NotFoundError();

    periode.set({ ...req.body });
    periode.status = await PeriodeAktif.getPeriodeStatus(req.body);

    try {
      await periode.save();
      res.status(200).send(periode);
    } catch (e) {
      console.error(e);
      throw new BadRequestError(e.message);
    }
  }
);

export { router as updatePeriodeRouter };
