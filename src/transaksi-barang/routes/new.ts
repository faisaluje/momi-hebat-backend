import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import mongoose from 'mongoose'

import { BarangService } from '../../barang/services/barang'
import { JenisTransaksi } from '../../common/enums/jenis-transaksi'
import { BadRequestError } from '../../common/errors/bad-request-error'
import { requireAuth } from '../../common/middleware/require-auth'
import { validateRequest } from '../../common/middleware/validate-request'
import { URL_TRANSAKSI_BARANG } from '../../contants'
import { Periode } from '../../periode/models/periode'
import { StokBarangService } from '../../stok-barang/services/stok-barang'
import { TransaksiBarang, TransaksiBarangAttrs } from '../models/transaksi-barang'
import { Items } from '../services/items'
import { NoTransaksiBarang } from '../services/no-transaksi-barang'

const router = express.Router();

router.post(
  URL_TRANSAKSI_BARANG,
  requireAuth,
  [
    body('tgl')
      .notEmpty()
      .withMessage('Tanggal transaksi harus berupa tanggal'),
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

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const noTransaksiBarang = await NoTransaksiBarang.generateNoTransaksi({
        ...body,
        periode,
      });
      const listBarang = await BarangService.getListBarang(
        body.items.map((item) => item.barang),
        session
      );
      const items = Items.getItems(listBarang, body.items);
      const transaksiBarang = TransaksiBarang.build({
        ...body,
        no: noTransaksiBarang,
        items,
        periode,
      });
      await transaksiBarang.save({ session });

      await StokBarangService.upsertStokBarang(transaksiBarang, { session });

      await session.commitTransaction();
      session.endSession();
      res.status(201).send(transaksiBarang);
    } catch (e) {
      console.error(e);
      await session.abortTransaction();
      session.endSession();
      throw new BadRequestError('Gagal menyimpan transaksi');
    }
  }
);

export { router as newTransaksiBarangRouter };
