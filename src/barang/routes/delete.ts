import express, { Request, Response } from 'express';
import { URL_BARANG } from '../../contants';
import { requireAuth } from '../../common/middleware/require-auth';
import { NotFoundError } from '../../common/errors/not-foud-error';
import { Barang } from '../model/barang';

const router = express.Router();

router.delete(
  `${URL_BARANG}/:barangId`,
  requireAuth,
  async (req: Request, res: Response) => {
    const barang = await Barang.findById(req.params.barangId);
    if (!barang) throw new NotFoundError();

    await barang.delete(req.currentUser?.id);
    res.status(204).send();
  }
);

export { router as deleteBarangRouter };
