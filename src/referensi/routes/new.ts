import express, { Response, Request } from 'express';
import { URL_PERIODE } from '../../contants';
import { requireAuth } from '../../common/middleware/require-auth';
import { validateRequest } from '../../common/middleware/validate-request';
import { body } from 'express-validator';
import { Periode } from '../../periode/models/periode';
import { BadRequestError } from '../../common/errors/bad-request-error';

const router = express.Router();

router.post(
  URL_PERIODE,
  requireAuth,
  [
    body('id').notEmpty().withMessage('Id tidak boleh kosong'),
    body('judul').notEmpty().withMessage('Judul tidak boleh kosong'),
    body('noHp').isNumeric().optional().withMessage('No HP harus angka semua'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const periodeEksist = await Periode.findById(req.body.id);
    if (!periodeEksist) {
      throw new BadRequestError('Periode tidak ditemukan');
    }

    res.status(201).send({});
  }
);

export { router as newReferensiRouter };
