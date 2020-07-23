import 'express-async-errors'

import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import cors from 'cors'
import express from 'express'
import path from 'path'

import { indexAgenRouter } from './agen/routes'
import { newAgenRouter } from './agen/routes/new'
import { updateAgenRouter } from './agen/routes/update'
import { currentUserRouter } from './auth/routes/current-user'
import { signinRouter } from './auth/routes/signin'
import { signoutRouter } from './auth/routes/signout'
import { signupRouter } from './auth/routes/signup'
import { indexBarangRouter } from './barang/routes'
import { deleteBarangRouter } from './barang/routes/delete'
import { newBarangRouter } from './barang/routes/new'
import { updateBarangRouter } from './barang/routes/update'
import { currentUser } from './common/middleware/current-user'
import { errorHandler } from './common/middleware/error-handler'
import { URL_FRONTEND } from './contants'
import { indexJenisPaketRouter } from './jenis-paket/routes'
import { newJenisPaketRouter } from './jenis-paket/routes/new'
import { updateJenisPaketRouter } from './jenis-paket/routes/update'
import { indexKartuPaketRouter } from './kartu-paket/routes'
import { updateKartuPaketRouter } from './kartu-paket/routes/update'
import { indexKaryawanRouter } from './karyawan/routes'
import { deleteKaryawanRouter } from './karyawan/routes/delete'
import { newKaryawanRouter } from './karyawan/routes/new'
import { updateKaryawanRouter } from './karyawan/routes/update'
import { indexPackingRouter } from './packing/routes'
import { deletePackingRouter } from './packing/routes/delete'
import { newPackingRouter } from './packing/routes/new'
import { indexPaketRouter } from './paket/routes'
import { newPaketRouter } from './paket/routes/new'
import { updatePaketRouter } from './paket/routes/update'
import { indexPengaturanPaketAgenRouter } from './pengaturan-paket-agen/routes'
import { newPengaturanPaketAgenRouter } from './pengaturan-paket-agen/routes/new'
import { indexPenggunaRouter } from './pengguna/routes'
import { changePenggunaPasswordRouter } from './pengguna/routes/change-password'
import { newPenggunaRouter } from './pengguna/routes/new'
import { updatePenggunaRouter } from './pengguna/routes/update'
import { indexPeriodeRouter } from './periode/routes'
import { deletePeriodeRouter } from './periode/routes/delete'
import { newPeriodeRouter } from './periode/routes/new'
import { updatePeriodeRouter } from './periode/routes/update'
import { indexStokBarangRouter } from './stok-barang/routes'
import { indexTransaksiBarangRouter } from './transaksi-barang/routes'
import { deleteTransaksiBarangRouter } from './transaksi-barang/routes/delete'
import { newTransaksiBarangRouter } from './transaksi-barang/routes/new'
import { indexTransaksiKartuPaketRouter } from './transaksi-kartu-paket/routes'
import { deleteTransaksiKartuPaketRouter } from './transaksi-kartu-paket/routes/delete'
import { newTransaksiKartuPaketRouter } from './transaksi-kartu-paket/routes/new'
import { indexTransaksiPaketRouter } from './transaksi-paket/routes'
import { deleteTransaksiPaketRouter } from './transaksi-paket/routes/delete'
import { newTransasiPaketRouter } from './transaksi-paket/routes/new'
import { indexTransaksiSaldoRouter } from './transaksi-saldo/routes'
import { deleteTransaksiSaldoRouter } from './transaksi-saldo/routes/delete'
import { newTransaksiSaldoRouter } from './transaksi-saldo/routes/new'

const app = express();
app.set('trust proxy', true);
app.use(
  cors({
    credentials: true,
    origin: URL_FRONTEND,
  })
);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === 'production',
  })
);

// check user login before act all
app.use(currentUser);

// Auth Module
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

// Pengguna Module
app.use(indexPenggunaRouter);
app.use(newPenggunaRouter);
app.use(updatePenggunaRouter);
app.use(changePenggunaPasswordRouter);

// Periode Module
app.use(newPeriodeRouter);
app.use(indexPeriodeRouter);
app.use(deletePeriodeRouter);
app.use(updatePeriodeRouter);

// Karyawan Module
app.use(newKaryawanRouter);
app.use(indexKaryawanRouter);
app.use(updateKaryawanRouter);
app.use(deleteKaryawanRouter);

// Agen Modul
app.use(newAgenRouter);
app.use(indexAgenRouter);
app.use(updateAgenRouter);

// Barang Modul
app.use(newBarangRouter);
app.use(indexBarangRouter);
app.use(updateBarangRouter);
app.use(deleteBarangRouter);

// Paket Modul
app.use(newPaketRouter);
app.use(indexPaketRouter);
app.use(updatePaketRouter);

// Transaksi Saldo Modul
app.use(newTransaksiSaldoRouter);
app.use(indexTransaksiSaldoRouter);
app.use(deleteTransaksiSaldoRouter);

// Stok Barang Modul
app.use(indexStokBarangRouter);

// Transaksi Barang Modul
app.use(newTransaksiBarangRouter);
app.use(indexTransaksiBarangRouter);
app.use(deleteTransaksiBarangRouter);

// Jenis Paket Modul
app.use(newJenisPaketRouter);
app.use(indexJenisPaketRouter);
app.use(updateJenisPaketRouter);

// Transaksi Paket Modul
app.use(newTransasiPaketRouter);
app.use(indexTransaksiPaketRouter);
app.use(deleteTransaksiPaketRouter);

// Packing Modul
app.use(newPackingRouter);
app.use(indexPackingRouter);
app.use(deletePackingRouter);

// Kartu Paket Modul
app.use(indexKartuPaketRouter);
app.use(updateKartuPaketRouter);

// Transaksi Kartu Paket Modul
app.use(newTransaksiKartuPaketRouter);
app.use(indexTransaksiKartuPaketRouter);
app.use(deleteTransaksiKartuPaketRouter);

// Pengaturan Paket Agen Modul
app.use(newPengaturanPaketAgenRouter);
app.use(indexPengaturanPaketAgenRouter);

app.use(express.static('public'));

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname + '/../public/index.html'));
});

app.use(errorHandler);

export { app };
