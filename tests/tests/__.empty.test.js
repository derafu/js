const path = require('path');

describe('__.empty()', () => {
  beforeAll(async () => {
    const absolutePath = path.join(__dirname, '../html/__.empty.test.html');
    await page.goto(`file://${absolutePath}`);
  });

  test('__.empty with empty string', async () => {
    const result = await page.evaluate(() => __.empty(''));
    expect(result).toBe(true);
  });

  test('__.empty with non-empty string', async () => {
    const result = await page.evaluate(() => __.empty('texto'));
    expect(result).toBe(false);
  });

  test('__.empty with null', async () => {
    const result = await page.evaluate(() => __.empty(null));
    expect(result).toBe(true);
  });

  test('__.empty with undefined', async () => {
    const result = await page.evaluate(() => __.empty(undefined));
    expect(result).toBe(true);
  });

  test('__.empty with NaN', async () => {
    const result = await page.evaluate(() => __.empty(NaN));
    expect(result).toBe(true);
  });

  test('__.empty with empty object', async () => {
    const result = await page.evaluate(() => __.empty({}));
    expect(result).toBe(true);
  });

  test('__.empty with object with properties', async () => {
    const result = await page.evaluate(() => __.empty({ a: 1 }));
    expect(result).toBe(false);
  });

  test('__.empty with number', async () => {
    const result = await page.evaluate(() => __.empty(123));
    expect(result).toBe(false);
  });

  test('__.empty with invalid date', async () => {
    const result = await page.evaluate(() => __.empty(new Date('invalid date')));
    expect(result).toBe(true);
  });

  test('__.empty with valid date', async () => {
    const result = await page.evaluate(() => __.empty(new Date('2023-01-01')));
    expect(result).toBe(false);
  });

  test('__.empty with empty array', async () => {
    const result = await page.evaluate(() => __.empty([]));
    expect(result).toBe(true);
  });

  test('__.empty with non-empty array', async () => {
    const result = await page.evaluate(() => __.empty([1, 2, 3]));
    expect(result).toBe(false);
  });

  test('__.empty with empty input', async () => {
    const result = await page.evaluate(() => {
      const input = document.getElementById('testInputEmpty');
      return __.empty(input);
    });
    expect(result).toBe(true);
  });

  test('__.empty with input with value', async () => {
    const result = await page.evaluate(() => {
      const input = document.getElementById('testInputNotEmpty');
      return __.empty(input);
    });
    expect(result).toBe(false);
  });

  test('__.empty with empty select', async () => {
    const result = await page.evaluate(() => {
      const select = document.getElementById('testSelectEmpty');
      return __.empty(select);
    });
    expect(result).toBe(true);
  });

  test('__.empty with select with value', async () => {
    const result = await page.evaluate(() => {
      const select = document.getElementById('testSelectNotEmpty');
      return __.empty(select);
    });
    expect(result).toBe(false);
  });

  test('__.empty with empty textarea', async () => {
    const result = await page.evaluate(() => {
      const textarea = document.getElementById('testTextareaEmpty');
      return __.empty(textarea);
    });
    expect(result).toBe(true);
  });

  test('__.empty with textarea with value', async () => {
    const result = await page.evaluate(() => {
      const textarea = document.getElementById('testTextareaNotEmpty');
      return __.empty(textarea);
    });
    expect(result).toBe(false);
  });
});
