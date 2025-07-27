const path = require('path');
const { pages_open_wait } = require('./../utils/puppeteer');

describe('__.popup()', () => {
  beforeAll(async () => {
    const absolutePath = path.join(__dirname, '../html/__.popup.test.html');
    const url = `file://${absolutePath}`;
    await page.goto(url);
  });

  test('should open a popup', async () => {
    const initialPages = (await browser.pages()).length;
    await page.click('#trigger-popup');

    // Get opened pages.
    await new Promise(resolve => setTimeout(resolve, 1));
    const pages = await pages_open_wait(initialPages, 1);

    // Verify the URL of the opened page.
    const popupPage = pages[pages.length - 1]; // Select the last opened page.
    const popupUrl = await popupPage.url();
    expect(popupUrl).toBe('https://www.google.com/');
  });
});
