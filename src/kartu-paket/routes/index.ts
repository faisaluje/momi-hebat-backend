import express, { Request, Response } from 'express';

import { NotFoundError } from '../../common/errors/not-foud-error';
import { requireAuth } from '../../common/middleware/require-auth';
import { URL_KARTU_PAKET } from '../../contants';
import { Periode } from '../../periode/models/periode';
import { KartuPaket } from '../models/kartu-paket';

const router = express.Router();

router.get(
  URL_KARTU_PAKET,
  requireAuth,
  async (req: Request, res: Response) => {
    const { periodeId } = req.query;
    const periode = periodeId
      ? await Periode.findById(periodeId)
      : req.currentUser!.periode;
    if (!periode) {
      throw new NotFoundError();
    }

    const kartuPaketList = await KartuPaket.aggregate([
      {
        $lookup: {
          from: 'transaksikartupakets',
          let: { kartuPaketId: '$_id', deleted: false },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      items: {
                        kartuPaket: '$$kartuPaketId',
                      },
                    },
                    { $eq: ['$deleted', '$$deleted'] },
                  ],
                },
              },
            },
          ],
          as: 'transaksi',
        },
      },
      { $unwind: '$transaksi' },
      { $unwind: '$transaksi.items' },
      {
        $group: {
          _id: {
            id: '$_id',
            nama: '$nama',
            stok: '$stok',
          },
          stokMasuk: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$transaksi.items.kartuPaket', '$_id'] },
                    { $eq: ['$transaksi.jenis', 'masuk'] },
                  ],
                },
                '$transaksi.items.jumlah',
                0,
              ],
            },
          },
          stokKeluar: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$transaksi.items.kartuPaket', '$_id'] },
                    { $eq: ['$transaksi.jenis', 'keluar'] },
                  ],
                },
                '$transaksi.items.jumlah',
                0,
              ],
            },
          },
        },
      },
    ]);

    res.send(kartuPaketList);
  }
);

export { router as indexKartuPaketRouter };
