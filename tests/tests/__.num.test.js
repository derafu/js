// __.num.test.js

// Simulate a fixed language for tests.
Utils.getUserLanguage = function() {
  return 'es-cl'; // Use the default language.
};

// Test that __.num correctly formats an integer.
test('__.num with an integer', () => {
  expect(__.num(1234)).toBe('1.234');
});

// Test that __.num correctly formats a float with decimals.
test('__.num with a float', () => {
  expect(__.num(1234.56)).toBe('1.235');
});

// Test that __.num correctly handles a negative number.
test('__.num with a negative number', () => {
  expect(__.num(-1234)).toBe('-1.234');
});

// Test that __.num correctly handles the additional decimals option.
test('__.num with additional decimals', () => {
  expect(__.num(1234, 4)).toBe('1.234,0000');
});

// Test that __.num correctly formats an integer that is passed as a string.
test('__.num with an integer as string', () => {
  expect(__.num('123456789', 0)).toBe('123.456.789');
});

// Test that __.num correctly formats a float with decimals that is passed as a string.
test('__.num with a float with decimals as string', () => {
  expect(__.num('123456789.0125', 4)).toBe('123.456.789,0125');
});

// Test that __.num correctly formats a float with decimals that is passed as a string (in English).
test('__.num with a float with decimals as string (in English)', () => {
  expect(__.num('123456789.0125', 4, 'en-us')).toBe('123,456,789.0125');
});

// Test that __.num formats an undefined value as the number 0.
test('__.num with an undefined value', () => {
  expect(__.num(undefined)).toBe('0');
});

// Test that __.num formats a value with decimals without relevant part as integer.
test('__.num with a decimal value with non-relevant decimals returns integer', () => {
  expect(__.num(1234.00)).toBe("1.234");
});

// Test that __.num formats a value with decimals that should not be rounded.
test('__.num with a decimal value with decimals that should not be rounded', () => {
  expect(__.num(1234.244, 2)).toBe("1.234,24");
});

// Test that __.num formats a value with decimals that should be rounded.
test('__.num with a decimal value with decimals that should be rounded', () => {
  expect(__.num(1234.245, 2)).toBe("1.234,25");
});
