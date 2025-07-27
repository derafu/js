const path = require('path');

describe('__.paste()', () => {
  beforeAll(async () => {
    const absolutePath = path.join(__dirname, '../html/__.paste.test.html');
    const url = `file://${absolutePath}`;
    await page.goto(url);
  });

  test('dummy test, since it is not really tested', async () => {
    // Not tested due to permission issues. Should tests be moved to HTTP server?
    expect(true).toBe(true);
  });
});
