import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../../contants';
import { Pengguna } from '../../pengguna/models/pengguna';
import { JwtPayload } from '../../auth/dto/jwt-payload';

declare global {
  namespace Express {
    interface Request {
      currentUser?: JwtPayload;
    }
  }
}

export const currentUser = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY || JWT_KEY
    ) as JwtPayload;

    const user = await Pengguna.findOne({ username: payload.username });
    if (!user) {
      return next();
    }

    req.currentUser = payload;
  } catch (err) {}

  next();
};
