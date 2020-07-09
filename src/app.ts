import 'express-async-errors'

import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import cors from 'cors'
import express from 'express'

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
import { NotFoundError } from './common/errors/not-foud-error'
import { currentUser } from './common/middleware/current-user'
import { errorHandler } from './common/middleware/error-handler'
import { URL_FRONTEND } from './contants'
import { indexKaryawanRouter } from './karyawan/routes'
import { deleteKaryawanRouter } from './karyawan/routes/delete'
import { newKaryawanRouter } from './karyawan/routes/new'
import { updateKaryawanRouter } from './karyawan/routes/update'
import { indexPaketRouter } from './paket/routes'
import { deletePaketRouter } from './paket/routes/delete'
import { newPaketRouter } from './paket/routes/new'
import { updatePaketRouter } from './paket/routes/update'
import { indexPenggunaRouter } from './pengguna/routes'
import { changePenggunaPasswordRouter } from './pengguna/routes/change-password'
import { newPenggunaRouter } from './pengguna/routes/new'
import { updatePenggunaRouter } from './pengguna/routes/update'
import { indexPeriodeRouter } from './periode/routes'
import { deletePeriodeRouter } from './periode/routes/delete'
import { newPeriodeRouter } from './periode/routes/new'
import { updatePeriodeRouter } from './periode/routes/update'
import { indexSaldoAgenRouter } from './saldo-agen/routes'
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

app.use(express.static('public'));

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
app.use(deletePaketRouter);

// Transaksi Saldo Modul
app.use(newTransaksiSaldoRouter);
app.use(indexTransaksiSaldoRouter);
app.use(deleteTransaksiSaldoRouter);

// Saldo Agen Modul
app.use(indexSaldoAgenRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
