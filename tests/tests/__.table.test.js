const path = require('path');

describe('__.table()', () => {
  beforeAll(async () => {
    const absolutePath = path.join(__dirname, '../html/__.table.test.html');
    const url = `file://${absolutePath}`;
    await page.goto(url);
  });

  test('debería crear una tabla con los datos proporcionados', async () => {
    await page.click('#generate-table');

    const tableExists = await page.evaluate(() => {
      const table = document.querySelector('#table-container table');
      return table !== null && table.rows.length === 3; // Incluyendo la fila de encabezado
    });

    expect(tableExists).toBe(true);
  });
});
