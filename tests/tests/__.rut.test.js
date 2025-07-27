// __.rutDV.test.js

// Array of RUTs in string format.
const correctRuts = [
  '76.192.083-9',
  '76,192,083-9',
  '1-9',
  '2-7',
  '66666666-6',
  '55555555-5',
  '12345678-5',
  '12345679-3',
  '12345680-7',
  '12345681-5',
  '12345682-3',
  '12345683-1',
  '12345684-K',
  '12345685-8',
  '12345686-6',
  '12345687-4',
];

// Array of objects with RUT and a boolean indicating whether it is correct or not.
const rutsToTest = [
  { rut: '76.192.083-9', correcto: true },
  { rut: '76,192,083-9', correcto: true },
  { rut: '76.192.083-0', correcto: false },
  { rut: '1-1', correcto: false },
  { rut: '1-7', correcto: false },
  { rut: '12.345.678-K', correcto: false },
  { rut: '12.345.678-5', correcto: true },
];

// Test to validate correct RUTs.
test('Validation of correct RUTs', () => {
  correctRuts.forEach(rut => {
    expect(__.rut(rut)).toBe(true);
  });
});

// Test to validate incorrect RUTs.
test('Validation of incorrect RUTs', () => {
  rutsToTest.forEach(({ rut, correcto }) => {
    expect(__.rut(rut)).toBe(correcto);
  });
});
