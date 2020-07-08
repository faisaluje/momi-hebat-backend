import request from 'supertest'

import { app } from '../../../app'

const agenId = '5f02a55a1be86000287fdbf4';

it('returns a 401 if not authenticated', () => {
  return request(app)
    .get('/api/transaksi-saldo/' + agenId)
    .send()
    .expect(401);
});
