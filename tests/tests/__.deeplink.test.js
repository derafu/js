const path = require('path');

describe('__.deeplink()', () => {
  beforeAll(async () => {
    const absolutePath = path.join(__dirname, '../html/__.deeplink.test.html');
    const url = `file://${absolutePath}`;
    await page.goto(url);
  });

  test('debería actualizar la URL al hacer clic en el botón de Sección 1', async () => {
    await page.click('#link1');
    expect(await page.url()).toContain('#seccion1');
  });

  test('debería actualizar la URL al hacer clic en el botón de Sección 2', async () => {
    await page.click('#link2');
    expect(await page.url()).toContain('#seccion2');
  });
});
