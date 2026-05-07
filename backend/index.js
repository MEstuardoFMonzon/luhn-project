const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'luhndb',
  port: 5432,
});

// Algoritmo de Luhn
function luhnCheck(num) {
  const digits = String(num).replace(/\D/g, '').split('').reverse().map(Number);
  const sum = digits.reduce((acc, digit, i) => {
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    return acc + digit;
  }, 0);
  return sum % 10 === 0;
}

app.post('/validar', async (req, res) => {
  const { numero } = req.body;
  const valido = luhnCheck(numero);

  if (valido) {
    await pool.query(
      'INSERT INTO numeros_validos (numero) VALUES ($1)',
      [numero]
    );
  }

  res.json({ valido });
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const server = app.listen(3000, () => console.log('Backend corriendo en puerto 3000'));

module.exports = { app, server };