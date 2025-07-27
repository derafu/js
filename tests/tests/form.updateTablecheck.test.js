const path = require('path');

describe('Form.updateTablecheck()', () => {
  beforeAll(async () => {
    const absolutePath = path.join(__dirname, '../html/form.updateTablecheck.test.html');
    const url = `file://${absolutePath}`;
    await page.goto(url);
  });

  test('Actualiza las filas de la tabla basadas en la selección', async () => {
    // Seleccionar categoria1 y actualizar la tabla
    await page.select('#categoriaSelect', 'categoria1');
    await page.click('#updateTable');
    await page.waitForFunction(() => document.querySelectorAll('#opcionesTable tbody tr').length > 0);

    let rows = await page.$$eval('#opcionesTable tbody tr', trs => trs.map(tr => tr.textContent.trim()));
    expect(rows).toEqual(['Opción 1', 'Opción 2']);

    // Seleccionar categoria2 y actualizar la tabla
    await page.select('#categoriaSelect', 'categoria2');
    await page.click('#updateTable');
    await page.waitForFunction(() => document.querySelectorAll('#opcionesTable tbody tr').length > 0);

    rows = await page.$$eval('#opcionesTable tbody tr', trs => trs.map(tr => tr.textContent.trim()));
    expect(rows).toEqual(['Opción 3', 'Opción 4']);
  });
});
