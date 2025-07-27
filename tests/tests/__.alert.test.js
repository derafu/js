const path = require('path');

describe('__.alert()', () => {
  beforeAll(async () => {
    const absolutePath = path.join(__dirname, '../html/__.alert.test.html');
    const url = `file://${absolutePath}`;
    await page.goto(url);
  });

  test('should display an alert', async () => {
    await page.click('#trigger-alert');

    // Wait for the bootbox alert to appear.
    await page.waitForSelector('.bootbox.modal', { visible: true });
    const message = await page.$eval('.bootbox.modal .bootbox-body', el => el.textContent);

    // Verify that the alert message is the expected one.
    expect(message.trim()).toBe('¡Alerta importante!');
  });
});
