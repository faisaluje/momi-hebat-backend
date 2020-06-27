import express from 'express';
import { URL_AUTH } from '../../contants';

const router = express.Router();

router.post(`${URL_AUTH}/signout`, (req, res) => {
  req.session = null;

  res.send({});
});

export { router as signoutRouter };
