import request from 'supertest';
import { app } from '../../../app';
import mongoose from 'mongoose';
import { Karyawan } from '../../models/karyawan';

const createNewKaryawan = async (cookie: string[]) => {
  const karyawan = await request(app)
    .post('/api/karyawan')
    .set('Cookie', cookie)
    .send({
      nama: `Faisal Uje`,
    });

  return karyawan.body;
};

it('returns a 401 if not authenticated', () => {
  const id = mongoose.Types.ObjectId();

  return request(app).delete(`/api/karyawan/${id}`).send().expect(401);
});

it('return a 404 if karyawan not found', async () => {
  const cookie = await global.signin();
  const id = mongoose.Types.ObjectId();

  return request(app)
    .delete(`/api/karyawan/${id}`)
    .set('Cookie', cookie)
    .send()
    .expect(404);
});

it('successfully soft deleted', async () => {
  const cookie = await global.signin();
  const newKaryawan = await createNewKaryawan(cookie);

  await request(app)
    .delete(`/api/karyawan/${newKaryawan.id}`)
    .set('Cookie', cookie)
    .send()
    .expect(204);

  const notExisted = await Karyawan.findOneDeleted({
    _id: newKaryawan.id,
  });

  expect(notExisted).not.toBeNull();
});
