import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Pengguna } from '../models/pengguna';
import { validateRequest } from '../../common/middleware/validate-request';
import { BadRequestError } from '../../common/errors/bad-request-error';
import { requireAuth } from '../../common/middleware/require-auth';
import { URL_PENGGUNA } from '../../contants';

const router = express.Router();

router.post(
  URL_PENGGUNA,
  requireAuth,
  [
    body('username')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Username harus antara 4 sampai 20 karakter'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password harus antara 4 sampai 20 karakter'),
    body('retypePassword')
      .trim()
      .custom((value, { req }) => value === req.body.password)
      .withMessage('Konfirmasi password tidak sesuai'),
    body('nama').trim().notEmpty().withMessage('Nama harus diisi'),
    body('peran').isEmpty().withMessage('Peran harus kosong'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { username } = req.body;

    const existingUser = await Pengguna.findOne({ username });
    if (existingUser) {
      throw new BadRequestError('Username sudah terdaftar!');
    }

    const pengguna = Pengguna.build(req.body);
    await pengguna.save();

    res.status(201).send(pengguna);
  }
);

export { router as newPenggunaRouter };
