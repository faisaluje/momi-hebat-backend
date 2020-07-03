import express, { Request, Response } from 'express';
import { URL_PAKET } from '../../contants';
import { requireAuth } from '../../common/middleware/require-auth';
import { body } from 'express-validator';
import { validateRequest } from '../../common/middleware/validate-request';
import { Paket, PaketAttrs } from '../models/paket';
import { Periode } from '../../periode/models/periode';
import { BadRequestError } from '../../common/errors/bad-request-error';
import { BarangDoc, Barang } from '../../barang/models/barang';
import { ListBarang } from '../services/list-barang';
import { NotFoundError } from '../../common/errors/not-foud-error';

const router = express.Router();

router.patch(
  `${URL_PAKET}/:paketId`,
  requireAuth,
  [body('nama').notEmpty().withMessage('Nama paket tidak boleh kosong')],
  validateRequest,
  async (req: Request, res: Response) => {
    const paket = await Paket.findById(req.params.paketId);
    if (!paket) throw new NotFoundError();

    const body: PaketAttrs = req.body;
    let listBarang: BarangDoc[] = [];

    if (body.barangs?.length > 0) {
      listBarang = await ListBarang.manipulateListBarang(body.barangs);
    }

    try {
      paket.set({ ...body, barangs: listBarang });
      await paket.save();

      res.status(200).send(paket);
    } catch (e) {
      console.error(e);
      throw new BadRequestError(e.message);
    }
  }
);

export { router as updatePaketRouter };
