const fs = require('fs');
const path = require('path');

describe('Frontend', () => {
  test('index.html existe y contiene el formulario', () => {
    const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    expect(html).toContain('Algoritmo de Luhn');
    expect(html).toContain('validar()');
  });
});