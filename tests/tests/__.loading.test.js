const path = require('path');

describe('__.loading()', () => {
  beforeAll(async () => {
    const absolutePath = path.join(__dirname, '../html/__.loading.test.html');
    const url = `file://${absolutePath}`;
    await page.goto(url);
  });

  test('should display a loading message', async () => {
    await page.click('#trigger-loading');

    // Wait for the bootbox message to appear.
    await page.waitForSelector('.bootbox.modal', { visible: true });
    const message = await page.$eval('.bootbox.modal .bootbox-body', el => el.textContent);

    // Verify that the loading message is the expected one.
    expect(message.trim()).toBe('Procesando...');
  });
});
