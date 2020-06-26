import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { requireAuth } from '../../common/middleware/require-auth';

const router = express.Router();

router.get('/api/users', requireAuth, async (req: Request, res: Response) => {
  const users = await User.find({});

  res.send(users);
});

export { router as indexUserRouter };
