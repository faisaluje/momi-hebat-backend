import express, { Request, Response } from 'express'
import multer from 'multer'

import { BadRequestError } from '../../common/errors/bad-request-error'
import { requireAuth } from '../../common/middleware/require-auth'
import { URL_AGEN } from '../../contants'
import { Agen, AgenAttrs } from '../models/agen'
import { NoAgen } from '../services/no-agen'

const storage = multer.diskStorage({
  destination: 'public/profile-pictures',
  filename: function (req, file, cb) {
    cb(null, `${req.params.agenId}.jpg`);
  },
});

const upload = multer({
  storage,
}).single('foto');

const router = express.Router();

router.post(
  `${URL_AGEN}/profile-photo/:agenId`,
  requireAuth,
  async (req: Request, res: Response) => {
    upload(req, res, (err: any) => {
      if (err) throw new BadRequestError('Gagal upload');

      res.status(200).send();
    });
  }
);

export { router as profilePhotoRouter };
