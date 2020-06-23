import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { Password } from '../services/password';
import { validateRequest } from '../../common/middleware/validate-request';
import { BadRequestError } from '../../common/errors/bad-request-error';

const router = express.Router();

router.post(
  '/api/users/signin',
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

    const userExisting = await User.findOne({ username });
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

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: userExisting.id,
        email: userExisting.username,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(userExisting);
  }
);

export { router as signinRouter };
