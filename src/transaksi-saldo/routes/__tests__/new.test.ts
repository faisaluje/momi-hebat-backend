import mongoose from 'mongoose'
import request from 'supertest'

import { AgenAttrs, AgenDoc } from '../../../agen/models/agen'
import { app } from '../../../app'
import { JenisTransaksi } from '../../../common/enums/jenis-transaksi'
import { TransaksiKategori } from '../../enums/transaksi-kategori'
import { TransaksiVia } from '../../enums/transaksi-via'

const agen: AgenAttrs = {
  diri: {
    nama: { lengkap: 'Faisal', panggilan: 'uje' },
    alamat: {
      jalan: 'Blok C8 No. 3',
      rt: null,
      rw: null,
      kelurahan: null,
      kecamatan: null,
      kabKota: null,
    },
    lahir: {
      tempat: 'Bandung',
      tanggal: new Date('1993-07-22'),
    },
    pekerjaan: 'Swasta',
    noTlp: null,
  },
  keluarga: {
    nama: { lengkap: 'Babe', panggilan: 'Asoy' },
    alamat: {
      jalan: 'Blok C8 No. 3',
      rt: null,
      rw: null,
      kelurahan: null,
      kecamatan: null,
      kabKota: null,
    },
    lahir: {
      tempat: 'Surga',
      tanggal: new Date('1980-01-20'),
    },
    pekerjaan: 'Pensiun',
    noTlp: null,
  },
};

const createNewAgen = async (
  cookie: string[],
  no: string,
  topAgen?: AgenDoc
) => {
  const newAgen = await request(app)
    .post('/api/agen')
    .set('Cookie', cookie)
    .send({
      ...agen,
      no,
      topAgen,
    });

  return newAgen.body;
};

it('returns a 401 if not authenticated', () => {
  return request(app)
    .post('/api/transaksi-saldo')
    .send({
      no: '000001',
      tgl: new Date(),
      jenis: JenisTransaksi.MASUK,
      via: TransaksiVia.TUNAI,
      kategori: TransaksiKategori.SETORAN,
      nominal: 250000,
    })
    .expect(401);
});

// it('return a 400 if tgl field is empty', async () => {
//   const cookie = await global.signin();

//   return request(app)
//     .post('/api/transaksi-saldo')
//     .set('Cookie', cookie)
//     .send({
//       no: '000001',
//       jenis: JenisTransaksi.MASUK,
//       via: TransaksiVia.TUNAI,
//       kategori: TransaksiKategori.SETORAN,
//       nominal: 250000,
//     })
//     .expect(400);
// });

// it('return a 400 if agen is not found', async () => {
//   const cookie = await global.signin();

//   return request(app)
//     .post('/api/transaksi-saldo')
//     .set('Cookie', cookie)
//     .send({
//       no: '000001',
//       tgl: new Date(),
//       jenis: JenisTransaksi.MASUK,
//       agen: { id: mongoose.Types.ObjectId() },
//       via: TransaksiVia.TUNAI,
//       kategori: TransaksiKategori.SETORAN,
//       nominal: 250000,
//     })
//     .expect(400);
// });

// it('return a 400 if nominal is empty', async () => {
//   const cookie = await global.signin();

//   return request(app)
//     .post('/api/transaksi-saldo')
//     .set('Cookie', cookie)
//     .send({
//       no: '000001',
//       tgl: new Date(),
//       jenis: JenisTransaksi.MASUK,
//       agen: { id: mongoose.Types.ObjectId() },
//       via: TransaksiVia.TUNAI,
//       kategori: TransaksiKategori.SETORAN,
//     })
//     .expect(400);
// });

// it('returns a 201 when given valid body', async () => {
//   const cookie = await global.signin();
//   const agen = await createNewAgen(cookie, '212');

//   const transaksiSaldo = await request(app)
//     .post('/api/transaksi-saldo')
//     .set('Cookie', cookie)
//     .send({
//       no: '000001',
//       tgl: '2020-06-06',
//       jenis: JenisTransaksi.MASUK,
//       agen: agen,
//       via: TransaksiVia.TUNAI,
//       kategori: TransaksiKategori.SETORAN,
//       nominal: 250000,
//     });

//   expect(transaksiSaldo.status).toEqual(201);
//   expect(transaksiSaldo.body.nominal).toEqual(250000);

//   const saldoAgen = await SaldoAgen.findOne({
//     periode: transaksiSaldo.body.periode.id,
//   });

//   expect(
//     saldoAgen!.saldo.find((saldo) => saldo.agen == transaksiSaldo.body.agen.id)
//   ).toBeDefined();
// });

// it('returns a minus saldo if jenis transaksi is keluar', async () => {
//   const cookie = await global.signin();
//   const agen = await createNewAgen(cookie, '212');

//   const transaksiSaldo = await request(app)
//     .post('/api/transaksi-saldo')
//     .set('Cookie', cookie)
//     .send({
//       no: '000001',
//       tgl: '2020-06-06',
//       jenis: JenisTransaksi.KELUAR,
//       agen: agen,
//       via: TransaksiVia.TUNAI,
//       kategori: TransaksiKategori.SETORAN,
//       nominal: 250000,
//     });

//   expect(transaksiSaldo.status).toEqual(201);
//   expect(transaksiSaldo.body.nominal).toEqual(250000);

//   const saldoAgen = await SaldoAgen.findOne({
//     periode: transaksiSaldo.body.periode.id,
//   });

//   const saldo = saldoAgen!.saldo.find(
//     (saldo) => saldo.agen == transaksiSaldo.body.agen.id
//   );

//   expect(saldo).toBeDefined();
//   expect(saldo?.jumlah).toEqual(-250000);
// });

// it('Saldo must counting', async () => {
//   const cookie = await global.signin();
//   const agen = await createNewAgen(cookie, '212');

//   const transaksiSaldo = await request(app)
//     .post('/api/transaksi-saldo')
//     .set('Cookie', cookie)
//     .send({
//       no: '000001',
//       tgl: '2020-06-06',
//       jenis: JenisTransaksi.MASUK,
//       agen: agen,
//       via: TransaksiVia.TUNAI,
//       kategori: TransaksiKategori.SETORAN,
//       nominal: 250000,
//     });

//   await request(app).post('/api/transaksi-saldo').set('Cookie', cookie).send({
//     no: '000001',
//     tgl: '2020-06-06',
//     jenis: JenisTransaksi.KELUAR,
//     agen: agen,
//     via: TransaksiVia.TUNAI,
//     kategori: TransaksiKategori.PENARIKAN,
//     nominal: 50000,
//   });

//   await request(app).post('/api/transaksi-saldo').set('Cookie', cookie).send({
//     no: '000001',
//     tgl: '2020-06-06',
//     jenis: JenisTransaksi.KELUAR,
//     agen: agen,
//     via: TransaksiVia.TUNAI,
//     kategori: TransaksiKategori.PENARIKAN,
//     nominal: 125000,
//   });

//   const saldoAgen = await SaldoAgen.findOne({
//     periode: transaksiSaldo.body.periode.id,
//   });

//   const saldo = saldoAgen!.saldo.find(
//     (saldo) => saldo.agen == transaksiSaldo.body.agen.id
//   );

//   expect(saldo).toBeDefined();
//   expect(saldo?.jumlah).toEqual(75000);
// });
