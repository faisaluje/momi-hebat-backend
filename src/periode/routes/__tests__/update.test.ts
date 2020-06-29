import request from 'supertest';
import { app } from '../../../app';
import mongoose from 'mongoose';
import { PeriodeStatus } from '../../enums/periode-status';

const createNewPeriode = async (cookie: string[], prefix: number = 1) => {
  const result = await request(app)
    .post('/api/periode')
    .set('Cookie', cookie)
    .send({
      nama: `2019_${prefix}`,
      tglMulai: '2019-01-01',
      tglBerakhir: '2020-01-01',
      status: PeriodeStatus.AKTIF,
    });

  return result.body;
};

it('returns a 401 if not authenticated', () => {
  const id = mongoose.Types.ObjectId();

  return request(app)
    .patch(`/api/periode/${id}`)
    .send({
      username: 'faisaluje',
      password: 'ainkpisan',
      nama: 'Faisal Uje',
      noHp: '081297282354',
    })
    .expect(401);
});

it('returns a 400 if the body is empty or some field is empty', async () => {
  const cookie = await global.signin();

  const periode = await createNewPeriode(cookie);

  await request(app)
    .patch(`/api/periode/${periode.id}`)
    .set('Cookie', cookie)
    .send()
    .expect(400);

  await request(app)
    .patch(`/api/periode/${periode.id}`)
    .set('Cookie', cookie)
    .send({
      tglMulai: '2020-01-01',
      tglBerakhir: '2020-06-30',
      status: PeriodeStatus.AKTIF,
    })
    .expect(400);

  await request(app)
    .patch(`/api/periode/${periode.id}`)
    .set('Cookie', cookie)
    .send({
      tglMulai: '2020-01-01',
      tglBerakhir: '2020-06-30',
      status: PeriodeStatus.AKTIF,
    })
    .expect(400);

  await request(app)
    .patch(`/api/periode/${periode.id}`)
    .set('Cookie', cookie)
    .send({
      nama: '2019-2020',
      tglBerakhir: '2020-06-30',
      status: PeriodeStatus.AKTIF,
    })
    .expect(400);

  await request(app)
    .patch(`/api/periode/${periode.id}`)
    .set('Cookie', cookie)
    .send({
      nama: '2019-2020',
      tglMulai: '2020-01-01',
      status: PeriodeStatus.AKTIF,
    })
    .expect(400);
});

it('returns a 400 if tglMulai or tglBerakhir is not date', async () => {
  const cookie = await global.signin();

  const periode = await createNewPeriode(cookie);

  await request(app)
    .patch(`/api/periode/${periode.id}`)
    .set('Cookie', cookie)
    .send({
      nama: '2019-2020',
      tglMulai: '20200101',
      tglBerakhir: '2020-01-01',
      status: PeriodeStatus.AKTIF,
    })
    .expect(400);

  await request(app)
    .patch(`/api/periode/${periode.id}`)
    .set('Cookie', cookie)
    .send({
      nama: '2019-2020',
      tglMulai: '2020-01-01',
      tglBerakhir: '20200101',
      status: PeriodeStatus.AKTIF,
    })
    .expect(400);
});

it('returns a 400 if tglBerakhir less than tglMulai', async () => {
  const cookie = await global.signin();

  const periode = await createNewPeriode(cookie);

  await request(app)
    .patch(`/api/periode/${periode.id}`)
    .set('Cookie', cookie)
    .send({
      nama: '2019-2020',
      tglMulai: '2020-01-01',
      tglBerakhir: '2019-01-01',
      status: PeriodeStatus.AKTIF,
    })
    .expect(400);
});

it('returns a 201 if given valid body', async () => {
  const cookie = await global.signin();

  const periode = await createNewPeriode(cookie);

  await request(app)
    .patch(`/api/periode/${periode.id}`)
    .set('Cookie', cookie)
    .send({
      nama: '2019-2020',
      tglMulai: '2020-01-01',
      tglBerakhir: '2021-01-01',
      status: PeriodeStatus.TIDAK_AKTIF,
    })
    .expect(200);
});

it('status should tidak_aktif when a periode status aktif exist', async () => {
  const cookie = await global.signin();

  const periode = await createNewPeriode(cookie);

  const periodeNonAktif = await request(app)
    .patch(`/api/periode/${periode.id}`)
    .set('Cookie', cookie)
    .send({
      nama: '2019-2020',
      tglMulai: '2019-01-01',
      tglBerakhir: '2020-01-01',
      status: PeriodeStatus.AKTIF,
    })
    .expect(200);

  expect(periodeNonAktif.body.status).toEqual(PeriodeStatus.TIDAK_AKTIF);
});
