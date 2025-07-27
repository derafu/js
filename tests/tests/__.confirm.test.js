const path = require('path');

describe('__.confirm()', () => {
  let page;
  let url;

  beforeAll(async () => {
    const absolutePath = path.join(__dirname, '../html/__.confirm.test.html');
    url = `file://${absolutePath}`;
    page = await global.browser.newPage();
    await page.goto(url);
  });

  afterAll(async () => {
    await page.close();
  });

  async function testInNewTab(testActions) {
    const newPage = await global.browser.newPage();
    await newPage.goto(url);

    await testActions(newPage);

    await newPage.close();
  }

  // Form - Accept.
  test('Accept in form should process the form', async () => {
    await testInNewTab(async (newPage) => {
      await newPage.click('input[type="submit"]');

      // Wait for the dialog (or the element that acts as a dialog) to be visible.
      await newPage.waitForSelector('.bootbox.modal', { visible: true });

      // Click the accept button of the dialog.
      await newPage.evaluate(() => {
        document.querySelector('.bootbox.modal .btn-success').click();
      });

      await newPage.waitForNavigation({ waitUntil: 'networkidle0', timeout: 10000 });

      expect(newPage.url()).toContain('jkorpela.fi/cgi-bin/echo.cgi');
    });
  }, 15000);

  // Form - Cancel.
  test('Cancel in form should not process the form', async () => {
    await testInNewTab(async (newPage) => {
      await newPage.click('input[type="submit"]');
      await newPage.waitForSelector('.bootbox.modal', { visible: true });

      // Click the cancel button of the dialog.
      await newPage.evaluate(() => {
        document.querySelector('.bootbox.modal .btn-danger').click();
      });

      // Wait a moment to verify that there is no redirection.
      await new Promise(resolve => setTimeout(resolve, 1000));

      expect(newPage.url()).toBe(url);
    });
  }, 15000);

  // Link - Accept.
  test('Accept in link should navigate to the link', async () => {
    await testInNewTab(async (newPage) => {
      await newPage.click('#test-link');
      await newPage.waitForSelector('.bootbox.modal', { visible: true });

      // Click the accept button of the dialog.
      await newPage.evaluate(() => {
        document.querySelector('.bootbox.modal .btn-success').click();
      });

      await newPage.waitForNavigation({ waitUntil: 'networkidle0', timeout: 10000 });

      expect(newPage.url()).toContain('sasco.cl');
    });
  }, 15000);

  // Link - Cancel.
  test('Cancel in link should not navigate to the link', async () => {
    await testInNewTab(async (newPage) => {
      await newPage.click('#test-link');
      await newPage.waitForSelector('.bootbox.modal', { visible: true });

      // Click the cancel button of the dialog.
      await newPage.evaluate(() => {
        document.querySelector('.bootbox.modal .btn-danger').click();
      });

      // Wait a moment to verify that there is no redirection.
      await new Promise(resolve => setTimeout(resolve, 1000));

      expect(newPage.url()).toBe(url);
    });
  }, 15000);
});
