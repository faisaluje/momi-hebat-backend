import express, { Request, Response } from 'express';
import { URL_KARYAWAN, URL_BARANG } from '../../contants';
import { requireAuth } from '../../common/middleware/require-auth';
import { NotFoundError } from '../../common/errors/not-foud-error';
import { Karyawan } from '../../karyawan/models/karyawan';

const router = express.Router();

router.delete(
  `${URL_BARANG}/:barangId`,
  requireAuth,
  async (req: Request, res: Response) => {
    const karyawan = await Karyawan.findById(req.params.karyawanId);
    if (!karyawan) throw new NotFoundError();

    await karyawan.delete(req.currentUser?.id);
    res.status(204).send();
  }
);

export { router as deleteKaryawanRouter };
