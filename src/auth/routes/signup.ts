import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { Pengguna } from '../../pengguna/models/pengguna';
import { validateRequest } from '../../common/middleware/validate-request';
import { BadRequestError } from '../../common/errors/bad-request-error';
import { JWT_KEY, URL_AUTH } from '../../contants';
import { JwtPayload } from '../dto/jwt-payload';
import { PeriodeAktif } from '../../periode/services/periode-aktif';

const router = express.Router();

router.post(
  `${URL_AUTH}/signup`,
  [
    body('username')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Username harus antara 4 sampai 20 karakter'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password harus antara 4 sampai 20 karakter'),
    body('nama').trim().notEmpty().withMessage('Nama harus diisi'),
    body('noHp').trim().notEmpty().withMessage('No. HP harus diisi'),
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

    const periodeAktif = await PeriodeAktif.getPeriodeAktif();

    const jwtPayload: JwtPayload = {
      id: pengguna.id,
      username: pengguna.username,
      nama: pengguna.nama,
      noHp: pengguna.noHp,
      peran: pengguna.peran,
      periode: periodeAktif,
    };

    // Generate JWT
    const userJwt = jwt.sign(jwtPayload, process.env.JWT_KEY || JWT_KEY);

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(pengguna);
  }
);

export { router as signupRouter };
