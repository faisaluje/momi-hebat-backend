import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Pengguna } from '../models/pengguna';
import { validateRequest } from '../../common/middleware/validate-request';
import { BadRequestError } from '../../common/errors/bad-request-error';
import { requireAuth } from '../../common/middleware/require-auth';
import { PenggunaStatus } from '../enums/pengguna-status';
import { NotFoundError } from '../../common/errors/not-foud-error';
import { URL_PENGGUNA } from '../../contants';

const router = express.Router();

router.patch(
  `${URL_PENGGUNA}/:penggunaId`,
  requireAuth,
  [
    body('username')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Username harus antara 4 sampai 20 karakter'),
    body('password').isEmpty().withMessage('Password tidak bisa dirubah'),
    body('nama').trim().notEmpty().withMessage('Nama harus diisi'),
    body('peran').isEmpty().withMessage('Peran harus kosong'),
    body('status')
      .isIn([PenggunaStatus.AKTIF, PenggunaStatus.TIDAK_AKTIF])
      .withMessage('Status hanya aktif & tidak_aktif'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { username } = req.body;
    const currentUser = await Pengguna.findById(req.params.penggunaId);
    if (!currentUser) throw new NotFoundError();

    if (currentUser.username !== username) {
      const existingUser = await Pengguna.findOne({ username });
      if (existingUser) {
        throw new BadRequestError('Username sudah terdaftar!');
      }
    }

    currentUser.set({ ...req.body });
    try {
      await currentUser.save();
      res.status(200).send(currentUser);
    } catch (e) {
      console.error(e);
      throw new BadRequestError(e.message);
    }
  }
);

export { router as updatePenggunaRouter };
