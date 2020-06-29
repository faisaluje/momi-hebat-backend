import express, { Response, Request } from 'express';
import { URL_PERIODE } from '../../contants';
import { requireAuth } from '../../common/middleware/require-auth';
import { validateRequest } from '../../common/middleware/validate-request';
import { body } from 'express-validator';
import { Periode } from '../models/periode';
import { PeriodeStatus } from '../enums/periode-status';

const router = express.Router();

router.post(
  URL_PERIODE,
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
    const periodeAktif = await Periode.findOne({ status: PeriodeStatus.AKTIF });
    if (periodeAktif) {
      req.body.status = PeriodeStatus.TIDAK_AKTIF;
    }

    const periode = Periode.build(req.body);
    await periode.save();

    res.status(201).send(periode);
  }
);

export { router as newPeriodeRouter };
