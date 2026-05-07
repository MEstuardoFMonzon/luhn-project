const request = require('supertest');
const app = require('./index');

describe('Algoritmo de Luhn', () => {
  test('número válido retorna valido: true', async () => {
    const res = await request(app)
      .post('/validar')
      .send({ numero: '4532015112830366' });
    expect(res.body.valido).toBe(true);
  });
});