import express, { Request, Response } from 'express'
import mongoose from 'mongoose'

import { JenisTransaksi } from '../../common/enums/jenis-transaksi'
import { BadRequestError } from '../../common/errors/bad-request-error'
import { NotFoundError } from '../../common/errors/not-foud-error'
import { requireAuth } from '../../common/middleware/require-auth'
import { URL_PACKING } from '../../contants'
import { PeriodeAktif } from '../../periode/services/periode-aktif'
import { TransaksiKategori } from '../../transaksi-paket/enums/transaksi-kategori'
import { PaketsDoc } from '../../transaksi-paket/models/transaksi-paket'
import { TransaksiPaketService } from '../../transaksi-paket/services/transaksi-paket'
import { Packing } from '../models/packing'

const router = express.Router();

router.post(URL_PACKING, requireAuth, async (req: Request, res: Response) => {
  const periode = await PeriodeAktif.getPeriodeAktif();
  if (!periode) throw new NotFoundError();

  await Packing.createCollection();

  const session = await mongoose.startSession();
  session.startTransaction();

  const packing = Packing.build(req.body);
  try {
    await packing.save({ session });

    const pakets: PaketsDoc[] = packing.proses.map((proses) => ({
      jenisPaket: proses.jenisPaket._id,
      jumlah: proses.jumlah,
    }));

    const transaksiPaket = await TransaksiPaketService.createTransaksiPaket(
      {
        tgl: packing.tgl,
        jenis: JenisTransaksi.MASUK,
        kategori: TransaksiKategori.PACKING,
        pakets,
        periode: packing.periode,
      },
      session
    );

    console.log(transaksiPaket);

    await session.commitTransaction();
    session.endSession();
  } catch (e) {
    console.error(e);
    await session.abortTransaction();
    session.endSession();
    throw new BadRequestError('Gagal menyimpan transaksi');
  }

  res.status(201).send(packing);
});

export { router as newPackingRouter };
