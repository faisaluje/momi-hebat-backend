import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Pengguna } from '../models/pengguna';
import { validateRequest } from '../../common/middleware/validate-request';
import { BadRequestError } from '../../common/errors/bad-request-error';
import { requireAuth } from '../../common/middleware/require-auth';
import { NotFoundError } from '../../common/errors/not-foud-error';
import { Password } from '../../auth/services/password';

const router = express.Router();

router.patch(
  '/api/pengguna/changePassword/:penggunaId',
  requireAuth,
  [
    body('currentPassword')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('Password tidak boleh kosong'),
    body('newPassword')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password harus antara 4 sampai 20 karakter'),
    body('retypeNewPassword')
      .trim()
      .custom((value, { req }) => value === req.body.newPassword)
      .withMessage('Konfirmasi password tidak sesuai'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { penggunaId } = req.params;
    const { currentPassword, newPassword } = req.body;
    const pengguna = await Pengguna.findById(penggunaId);
    if (!pengguna) throw new NotFoundError();

    const passwordMatch = await Password.compare(
      pengguna.password,
      currentPassword
    );
    if (!passwordMatch) {
      throw new BadRequestError('Pasword lama tidak sesuai');
    }

    try {
      pengguna.set({ password: newPassword });
      await pengguna.save();
      res.status(200).send(pengguna);
    } catch (e) {
      console.error(e);
      throw new BadRequestError(e.message);
    }
  }
);

export { router as changePenggunaPasswordRouter };
