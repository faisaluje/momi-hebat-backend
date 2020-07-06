import express, { Request, Response } from 'express';
import { URL_TRANSAKSI_BARANG } from '../../contants';
import { requireAuth } from '../../common/middleware/require-auth';
import { validateRequest } from '../../common/middleware/validate-request';
import { body } from 'express-validator';
import { JenisTransaksi } from '../../common/enums/jenis-transaksi';
import {
  TransaksiBarangAttrs,
  TransaksiBarang,
} from '../models/transaksi-barang';
import { Periode } from '../../periode/models/periode';
import { BadRequestError } from '../../common/errors/bad-request-error';
import { ListBarang } from '../../paket/services/list-barang';
import { Items } from '../services/items';

const router = express.Router();

router.post(
  URL_TRANSAKSI_BARANG,
  requireAuth,
  [
    body('tgl').isDate().withMessage('Tanggal transaksi harus berupa tanggal'),
    body('jenis')
      .isIn([JenisTransaksi.MASUK, JenisTransaksi.KELUAR])
      .withMessage('Jenis transaksi salah'),
    body('periode').isEmpty().withMessage('Periode tidak bisa dipilih'),
    body('items').notEmpty().withMessage('Barang belum diisi'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const body: TransaksiBarangAttrs = req.body;
    const periode = await Periode.findById(req.currentUser!.periode?._id);
    if (!periode) {
      throw new BadRequestError('Periode tidak ditemkan');
    }

    const listBarang = await ListBarang.manipulateListBarang(
      body.items.map((item) => item.barang)
    );

    const items = await Items.getItems(listBarang, body.items);

    const transaksiBarang = TransaksiBarang.build({
      ...body,
      items,
      periode,
    });
    await transaksiBarang.save();

    res.status(201).send(transaksiBarang);
  }
);
