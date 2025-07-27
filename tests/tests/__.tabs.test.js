const path = require('path');

describe('__.tabs()', () => {
  let baseUrl;

  beforeAll(async () => {
    const absolutePath = path.join(__dirname, '../html/__.tabs.test.html');
    const url = `file://${absolutePath}`;
    await page.goto(url);
    baseUrl = page.url().split('#')[0];
  });

  // Verify that the first tab activates after initializing the tabs.
  test('The first tab activates after initializing the tabs', async () => {
    const isFirstTabActive = await page.evaluate(() => {
      const firstTab = document.querySelector('#tab1-tab');
      return firstTab.classList.contains('active');
    });
    expect(isFirstTabActive).toBe(true);
    expect(page.url()).not.toContain('#tab1'); // When loading, the tab deeplink is not in the URL (this is expected).
  });

  // Click on the second tab and verify that it activates.
  test('Clicking on the second tab activates it', async () => {
    await page.click('#tab2-tab');
    const isSecondTabActive = await page.evaluate(() => {
      const secondTab = document.querySelector('#tab2-tab');
      return secondTab.classList.contains('active');
    });
    expect(isSecondTabActive).toBe(true);
    expect(page.url()).toContain('#tab2');
  });

  // Verify magic links in cards.
  test('Cards with magic links', async () => {
    const magicLinkExists = await page.evaluate(() => {
      return document.querySelector('.tab-pane .card .card-header a') !== null;
    });
    expect(magicLinkExists).toBe(true);
  });

  // Navigate to a specific URL with modal.
  test('Navigating to a URL with modal in the deeplink should open the modal', async () => {
    const newPage = await browser.newPage();
    await newPage.goto(`${baseUrl}#tab2:modal2`);
    await newPage.waitForSelector('#modal2.show', { visible: true });
    const modalIsOpen = await newPage.evaluate(() => {
      return document.querySelector('#modal2.show') !== null;
    });
    expect(modalIsOpen).toBe(true);
    expect(newPage.url()).toContain('#tab2:modal2');
    await newPage.close();
  });

  // Verify that a specific card is marked when clicking on a magic link.
  test('Mark a specific card when clicking on a magic link', async () => {
    await page.click('#tab1-tab');
    await page.click('#tab1_card2-card .card-header a');
    const isCardMarked = await page.evaluate(() => {
      const card = document.querySelector('#tab1_card2-card');
      return card.classList.contains('deeplink', 'border', 'border-danger');
    });
    expect(isCardMarked).toBe(true);
    expect(page.url()).toContain('#tab1:card2');
  });

  // Verify that a specific input is marked when clicking on its label.
  test('Mark a specific input when clicking on its label', async () => {
    await page.click('#tab3-tab');
    await page.click('label[for="input1"]');
    const isInputMarked = await page.evaluate(() => {
      const input = document.querySelector('#input1');
      return input.classList.contains('deeplink', 'border', 'border-danger');
    });
    expect(isInputMarked).toBe(true);
    expect(page.url()).toContain('#tab3:input1');
  });

  // Verify that a specific select is marked when clicking on its label.
  test('Mark a specific select when clicking on its label', async () => {
    await page.click('#tab3-tab');
    await page.click('label[for="select1"]');
    const isSelectMarked = await page.evaluate(() => {
      const select = document.querySelector('#select1');
      return select.classList.contains('deeplink', 'border', 'border-danger');
    });
    expect(isSelectMarked).toBe(true);
    expect(page.url()).toContain('#tab3:select1');
  });

  // Verify that a specific select2 is marked when clicking on its label.
  test('Mark a specific select2 when clicking on its label', async () => {
    await page.click('#tab3-tab');
    await page.click('label[for="select2"]');
    const isSelectMarked = await page.evaluate(() => {
      const select2Container = document.querySelector('#select2').parentElement.querySelector('span.select2-selection');
      return select2Container.classList.contains('deeplink', 'border', 'border-danger');
    });
    expect(isSelectMarked).toBe(true);
    expect(page.url()).toContain('#tab3:select2');
  });

  // Verify that a specific textarea is marked when clicking on its label.
  test('Mark a specific textarea when clicking on its label', async () => {
    await page.click('#tab3-tab');
    await page.click('label[for="textarea1"]');
    const isTextareaMarked = await page.evaluate(() => {
      const textarea = document.querySelector('#textarea1');
      return textarea.classList.contains('deeplink', 'border', 'border-danger');
    });
    expect(isTextareaMarked).toBe(true);
    expect(page.url()).toContain('#tab3:textarea1');
  });
});
