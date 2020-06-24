import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { User } from '../models/user';
import { validateRequest } from '../../common/middleware/validate-request';
import { BadRequestError } from '../../common/errors/bad-request-error';
import { JWT_KEY } from '../../contants';
import { JwtPayload } from '../dto/jwt-payload';

const router = express.Router();

router.post(
  '/api/users/signup',
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

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      throw new BadRequestError('Username sudah terdaftar!');
    }

    const user = User.build(req.body);
    await user.save();

    const jwtPayload: JwtPayload = {
      id: user.id,
      username: user.username,
      nama: user.nama,
      noHp: user.noHp,
      peran: user.peran,
    };

    // Generate JWT
    const userJwt = jwt.sign(jwtPayload, process.env.JWT_KEY || JWT_KEY);

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
