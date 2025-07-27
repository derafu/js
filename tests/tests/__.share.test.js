const path = require('path');
const { pages_open_wait } = require('./../utils/puppeteer');

describe('__.share()', () => {
  beforeAll(async () => {
    const absolutePath = path.join(__dirname, '../html/__.share.test.html');
    const url = `file://${absolutePath}`;
    await page.goto(url);
  });

  test('should open a modal and then a new window with the WhatsApp link', async () => {
    const initialPages = (await browser.pages()).length;
    await page.click('#trigger-share');

    // Wait for the Bootbox modal to open and then enter the phone number.
    await page.waitForSelector('.bootbox.modal', { visible: true });
    await page.waitForSelector('.bootbox.modal input[type="text"]', { visible: true });
    await page.type('.bootbox.modal input[type="text"]', '+56 9 57837322');

    // Wait explicitly for the "Send" button.
    await page.waitForSelector('.bootbox.modal .btn-success', { visible: true });

    // Click the "Send" button.
    await page.click('.bootbox.modal .btn-success');

    // Get opened pages.
    const pages = await pages_open_wait(initialPages, 1);

    // Verify the URL of the opened page.
    const whatsappPage = pages[pages.length - 1]; // Select the last opened page.
    const whatsappUrl = await whatsappPage.url();
    expect(whatsappUrl).toContain('https://api.whatsapp.com/resolve/?deeplink=%2F56957837322');
  });
});
