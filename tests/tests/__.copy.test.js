const path = require('path');

describe('__.copy()', () => {
  beforeAll(async () => {
    const absolutePath = path.join(__dirname, '../html/__.copy.test.html');
    const url = `file://${absolutePath}`;
    await page.goto(url);
  });

  test('should copy a string and show a confirmation message', async () => {
    await page.click('#trigger-copy-string');
    await page.waitForSelector('.notyf__toast', { visible: true });
    const message = await page.$eval('.notyf__toast .notyf__message', el => el.textContent);
    expect(message.trim()).toBe('Copied!');
  });

  test('should copy the value of an input and show a confirmation message', async () => {
    await page.click('#trigger-copy-input');
    await page.waitForSelector('.notyf__toast', { visible: true });
    const message = await page.$eval('.notyf__toast .notyf__message', el => el.textContent);
    expect(message.trim()).toBe('Copied!');
  });

  test('should copy the value of a textarea and show a confirmation message', async () => {
    await page.click('#trigger-copy-textarea');
    await page.waitForSelector('.notyf__toast', { visible: true });
    const message = await page.$eval('.notyf__toast .notyf__message', el => el.textContent);
    expect(message.trim()).toBe('Copied!');
  });

  test('should copy the text of a div and show a confirmation message', async () => {
    await page.click('#trigger-copy-div');
    await page.waitForSelector('.notyf__toast', { visible: true });
    const message = await page.$eval('.notyf__toast .notyf__message', el => el.textContent);
    expect(message.trim()).toBe('Copied!');
  });
});
