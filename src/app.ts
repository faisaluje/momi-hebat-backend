import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUserRouter } from './auth/routes/current-user';
import { signinRouter } from './auth/routes/signin';
import { signoutRouter } from './auth/routes/signout';
import { signupRouter } from './auth/routes/signup';
import { NotFoundError } from './common/errors/not-foud-error';
import { errorHandler } from './common/middleware/error-handler';
import { URL_FRONTEND } from './contants';
import { indexPenggunaRouter } from './pengguna/routes';
import { currentUser } from './common/middleware/current-user';
import { newPenggunaRouter } from './pengguna/routes/new';
import { updatePenggunaRouter } from './pengguna/routes/update';
import { changePenggunaPasswordRouter } from './pengguna/routes/change-password';
import { newPeriodeRouter } from './periode/routes/new';
import { indexPeriodeRouter } from './periode/routes';

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

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
