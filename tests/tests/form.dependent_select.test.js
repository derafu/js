const path = require('path');

describe('Form.removeOptions() and Form.addOptions()', () => {
  beforeAll(async () => {
    const absolutePath = path.join(__dirname, '../html/form.dependent_select.test.html');
    const url = `file://${absolutePath}`;
    await page.goto(url);
  });

  test('Updates the secondary select options based on the primary selection', async () => {
    // Test for the first category.
    await page.select('#selectPrimary', 'categoria1');
    let optionsText = await page.$$eval('#selectSecondary option', options => options.map(option => option.textContent));
    expect(optionsText).toEqual(['Opción 1', 'Opción 2']);

    // Test for the second category.
    await page.select('#selectPrimary', 'categoria2');
    optionsText = await page.$$eval('#selectSecondary option', options => options.map(option => option.textContent));
    expect(optionsText).toEqual(['Opción 3', 'Opción 4']);

    // Test to clear and re-add options.
    await page.click('#removeOptions');
    optionsText = await page.$$eval('#selectSecondary option', options => options.map(option => option.textContent));
    expect(optionsText).toEqual([]);

    // Ensure that the primary selection value remains 'categoria2'.
    await page.click('#addOptions');
    optionsText = await page.$$eval('#selectSecondary option', options => options.map(option => option.textContent));
    expect(optionsText).toEqual(['Opción 3', 'Opción 4']);
  });
});
