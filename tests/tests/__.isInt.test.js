// __.isInt.test.js

// Test that __.isInt returns true for an integer.
test('__.isInt with an integer', () => {
  expect(__.isInt(10)).toBe(true);
});

// Test that __.isInt returns false for a float.
test('__.isInt with a float', () => {
  expect(__.isInt(10.5)).toBe(false);
});

// Test that __.isInt returns true for a string that is an integer.
test('__.isInt with string that is an integer', () => {
  expect(__.isInt('20')).toBe(true);
});

// Test that __.isInt returns false for a string that is a float.
test('__.isInt with string that is a float', () => {
  expect(__.isInt('20.0')).toBe(false);
});

// Test that __.isInt returns false for a string that is not an integer.
test('__.isInt with string that is not an integer', () => {
  expect(__.isInt('texto')).toBe(false);
});
