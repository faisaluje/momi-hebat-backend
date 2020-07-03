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

const router = express.Router();

router.post(
  URL_PAKET,
  requireAuth,
  [body('nama').notEmpty().withMessage('Nama paket tidak boleh kosong')],
  validateRequest,
  async (req: Request, res: Response) => {
    const body: PaketAttrs = req.body;
    let listBarang: BarangDoc[] = [];
    const periode = await Periode.findById(body.periode.id);
    if (!periode) {
      throw new BadRequestError('Periode tidak ditemkan');
    }

    if (body.barangs?.length > 0) {
      listBarang = await ListBarang.manipulateListBarang(body.barangs);
    }

    const paket = Paket.build({
      ...body,
      barangs: listBarang,
    });
    await paket.save();

    res.status(201).send(paket);
  }
);

export { router as newPaketRouter };
