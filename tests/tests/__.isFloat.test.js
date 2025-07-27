// __.isFloat.test.js

// Test that __.isFloat returns true for a float.
test('__.isFloat with a float', () => {
  expect(__.isFloat(10.5)).toBe(true);
});

// Test that __.isFloat returns false for an integer.
test('__.isFloat with an integer', () => {
  expect(__.isFloat(10)).toBe(false);
});

// Test that __.isFloat returns true for a string that is a float.
test('__.isFloat with string that is a float', () => {
  expect(__.isFloat('10.5')).toBe(true);
});

// Test that __.isFloat returns false for a string that is not a number.
test('__.isFloat with string that is not a number', () => {
  expect(__.isFloat('texto')).toBe(false);
});

// Test that __.isFloat returns true for a string that is a float with decimal 0.
test('__.isFloat with string that is a float with decimal 0', () => {
  expect(__.isFloat('2.0')).toBe(true);
});
