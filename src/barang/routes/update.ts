import express, { Request, Response } from 'express';
import { URL_BARANG } from '../../contants';
import { requireAuth } from '../../common/middleware/require-auth';
import { body } from 'express-validator';
import { validateRequest } from '../../common/middleware/validate-request';
import { NotFoundError } from '../../common/errors/not-foud-error';
import { BadRequestError } from '../../common/errors/bad-request-error';
import { Barang } from '../model/barang';

const router = express.Router();

router.patch(
  `${URL_BARANG}/:barangId`,
  requireAuth,
  [body('nama').notEmpty().withMessage('Nama barang tidak boleh kosong')],
  validateRequest,
  async (req: Request, res: Response) => {
    const barang = await Barang.findById(req.params.barangId);
    if (!barang) throw new NotFoundError();

    barang.set({ ...req.body });

    try {
      await barang.save();
      res.status(200).send(barang);
    } catch (e) {
      console.error(e);
      throw new BadRequestError(e.message);
    }
  }
);

export { router as updateBarangRouter };
