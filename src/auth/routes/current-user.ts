import express from 'express';
import { currentUser } from '../../common/middleware/current-user';
import { URL_AUTH } from '../../contants';

const router = express.Router();

router.get(`${URL_AUTH}/currentuser`, currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
