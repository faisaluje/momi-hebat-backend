import request from 'supertest';
import { app } from '../../../app';
import { PeriodeStatus } from '../../enums/periode-status';
import { Periode } from '../../models/periode';

it('returns a 401 if not authenticated', () => {
  return request(app)
    .post('/api/periode')
    .send({
      nama: '2019-2020',
      tglMulai: '2020-01-01',
      tglBerakhir: '2020-06-30',
      status: PeriodeStatus.AKTIF,
    })
    .expect(401);
});

it('returns a 400 if the body is empty or some field is empty', async () => {
  const cookie = await global.signin();

  await request(app)
    .post('/api/periode')
    .set('Cookie', cookie)
    .send()
    .expect(400);

  await request(app)
    .post('/api/periode')
    .set('Cookie', cookie)
    .send({
      tglMulai: '2020-01-01',
      tglBerakhir: '2020-06-30',
      status: PeriodeStatus.AKTIF,
    })
    .expect(400);

  await request(app)
    .post('/api/periode')
    .set('Cookie', cookie)
    .send({
      tglMulai: '2020-01-01',
      tglBerakhir: '2020-06-30',
      status: PeriodeStatus.AKTIF,
    })
    .expect(400);

  await request(app)
    .post('/api/periode')
    .set('Cookie', cookie)
    .send({
      nama: '2019-2020',
      tglBerakhir: '2020-06-30',
      status: PeriodeStatus.AKTIF,
    })
    .expect(400);

  await request(app)
    .post('/api/periode')
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

  await request(app)
    .post('/api/periode')
    .set('Cookie', cookie)
    .send({
      nama: '2019-2020',
      tglMulai: '20200101',
      tglBerakhir: '2020-01-01',
      status: PeriodeStatus.AKTIF,
    })
    .expect(400);

  await request(app)
    .post('/api/periode')
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

  await request(app)
    .post('/api/periode')
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

  await request(app)
    .post('/api/periode')
    .set('Cookie', cookie)
    .send({
      nama: '2019-2020',
      tglMulai: '2020-01-01',
      tglBerakhir: '2021-01-01',
      status: PeriodeStatus.AKTIF,
    })
    .expect(201);
});

it('current periode aktif should be tidak_aktif if periode aktif created', async () => {
  const cookie = await global.signin();

  const periode = await request(app)
    .post('/api/periode')
    .set('Cookie', cookie)
    .send({
      nama: '2019-2020',
      tglMulai: '2020-01-01',
      tglBerakhir: '2021-01-01',
      status: PeriodeStatus.AKTIF,
    })
    .expect(201);

  const periodeAktif = await request(app)
    .post('/api/periode')
    .set('Cookie', cookie)
    .send({
      nama: '2019-2020',
      tglMulai: '2019-01-01',
      tglBerakhir: '2020-01-01',
      status: PeriodeStatus.AKTIF,
    })
    .expect(201);

  const periodeExist = await Periode.findById(periode.body.id);

  expect(periodeExist?.status).toEqual(PeriodeStatus.TIDAK_AKTIF);
  expect(periodeAktif.body.status).toEqual(PeriodeStatus.AKTIF);
});
