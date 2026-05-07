jest.mock('pg', () => {
  const mPool = {
    query: jest.fn().mockResolvedValue({ rows: [] }),
  };
  return { Pool: jest.fn(() => mPool) };
});

const { app, server } = require('./index');
const request = require('supertest');

afterAll((done) => {
  server.close(done);
});

describe('Algoritmo de Luhn', () => {
  test('número válido retorna valido: true', async () => {
    const res = await request(app)
      .post('/validar')
      .send({ numero: '4532015112830366' });
    expect(res.body.valido).toBe(true);
  });

  test('número inválido retorna valido: false', async () => {
    const res = await request(app)
      .post('/validar')
      .send({ numero: '1234567890123456' });
    expect(res.body.valido).toBe(false);
  });
});