import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import { NotFoundError } from '../../common/errors/not-foud-error';
import { requireAuth } from '../../common/middleware/require-auth';
import { URL_KARTU_PAKET } from '../../contants';
import { Periode } from '../../periode/models/periode';
import { PeriodeAktif } from '../../periode/services/periode-aktif';
import { TransaksiKartuPaketService } from '../../transaksi-kartu-paket/services/transaksi-kartu-paket';
import { KartuPaket } from '../models/kartu-paket';

const router = express.Router();

router.get(
  `${URL_KARTU_PAKET}/with-transaksi`,
  requireAuth,
  async (req: Request, res: Response) => {
    const { periodeId } = req.query;
    const periode = periodeId
      ? await Periode.findById(periodeId)
      : await PeriodeAktif.getPeriodeAktif();
    if (!periode) {
      throw new NotFoundError();
    }

    const kartuPaketList = await KartuPaket.aggregate([
      {
        $match: {
          $and: [{ deleted: false }, { periode: periode._id }],
        },
      },
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
            createdAt: `$createdAt`,
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
      { $sort: { '_id.createdAt': 1 } },
    ]);

    const transaksiKartuPaketAgen = await TransaksiKartuPaketService.getTransaksiKartuPaketAgen(
      periode
    );

    if (transaksiKartuPaketAgen?.length > 0) {
      kartuPaketList.forEach((kartuPaket) => {
        const kartuPaketSelected = transaksiKartuPaketAgen.find((kartu) =>
          mongoose.Types.ObjectId(kartu._id.id).equals(kartuPaket._id.id)
        );
        if (kartuPaketSelected) {
          kartuPaket.stokMasuk -= kartuPaketSelected.jumlahMasuk;
          kartuPaket.stokKeluar -= kartuPaketSelected.jumlahMasuk;
        }
      });
    }

    res.send(kartuPaketList);
  }
);

router.get(
  URL_KARTU_PAKET,
  requireAuth,
  async (req: Request, res: Response) => {
    const { periodeId } = req.query;
    const periode = periodeId
      ? await Periode.findById(periodeId)
      : await PeriodeAktif.getPeriodeAktif();
    if (!periode) {
      throw new NotFoundError();
    }

    const kartuPaketList = await KartuPaket.find({ periode }).sort({
      createdAt: 1,
    });

    res.send(kartuPaketList);
  }
);

export { router as indexKartuPaketRouter };
