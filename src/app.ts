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

const app = express();
app.set('trust proxy', true);
app.use(cors());
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === 'production',
  })
);

// Auth Module
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
