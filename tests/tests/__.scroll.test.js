const path = require('path');

describe('__.scroll()', () => {
  beforeAll(async () => {
    const absolutePath = path.join(__dirname, '../html/__.scroll.test.html');
    const url = `file://${absolutePath}`;
    await page.goto(url);
  });

  test('should scroll the page to the target element', async () => {
    await page.click('body'); // Simulate click to activate scrolling.
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for scrolling to complete.

    const scrollPosition = await page.evaluate(() => window.scrollY);
    expect(scrollPosition).toBeGreaterThan(900); // Verify if the page has scrolled.
  });
});
