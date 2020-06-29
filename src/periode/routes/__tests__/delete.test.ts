import request from 'supertest';
import { app } from '../../../app';
import { PeriodeStatus } from '../../enums/periode-status';
import mongoose from 'mongoose';
import { Periode } from '../../models/periode';

const createNewPeriode = (prefix: number, cookie: string[]) => {
  return request(app)
    .post('/api/periode')
    .set('Cookie', cookie)
    .send({
      nama: `2019_${prefix}`,
      tglMulai: '2019-01-01',
      tglBerakhir: '2020-01-01',
      status: PeriodeStatus.AKTIF,
    });
};

it('returns a 401 if not authenticated', () => {
  return request(app).delete('/api/periode/12312321').send().expect(401);
});

it('return a 404 if periode not found', async () => {
  const cookie = await global.signin();

  const id = mongoose.Types.ObjectId();

  return request(app)
    .delete(`/api/periode/${id}`)
    .set('Cookie', cookie)
    .send()
    .expect(404);
});

it('successfully deleted', async () => {
  const cookie = await global.signin();

  const newPeriode = await createNewPeriode(1, cookie);

  await request(app)
    .delete(`/api/periode/${newPeriode.body.id}`)
    .set('Cookie', cookie)
    .send()
    .expect(204);

  const notExisted = await Periode.findById(newPeriode.body.id);

  expect(notExisted).toBeNull();
});
