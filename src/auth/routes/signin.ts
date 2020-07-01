import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { Pengguna } from '../../pengguna/models/pengguna';
import { Password } from '../services/password';
import { validateRequest } from '../../common/middleware/validate-request';
import { BadRequestError } from '../../common/errors/bad-request-error';
import { JWT_KEY, URL_AUTH } from '../../contants';
import { JwtPayload } from '../dto/jwt-payload';
import { PenggunaStatus } from '../../pengguna/enums/pengguna-status';
import { PeriodeAktif } from '../../periode/services/periode-aktif';

const router = express.Router();

router.post(
  `${URL_AUTH}/signin`,
  [
    body('username')
      .trim()
      .notEmpty()
      .withMessage('Username tidak boleh kosong'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password tidak boleh kosong'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const userExisting = await Pengguna.findOne({
      username,
      status: PenggunaStatus.AKTIF,
    });
    if (!userExisting) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordMatch = await Password.compare(
      userExisting.password,
      password
    );
    if (!passwordMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    const periodeAktif = await PeriodeAktif.getPeriodeAktif();
    const jwtPayload: JwtPayload = {
      id: userExisting.id,
      username: userExisting.username,
      nama: userExisting.nama,
      noHp: userExisting.noHp,
      peran: userExisting.peran,
      periode: periodeAktif,
    };

    // Generate JWT
    const userJwt = jwt.sign(jwtPayload, process.env.JWT_KEY || JWT_KEY);

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(jwtPayload);
  }
);

export { router as signinRouter };
