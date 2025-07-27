// selector.test.js

// Data for selector() functionality tests.
const data = {
    rut: 1,
    dv: '9',
    razon_social: 'Esteban',
    comuna: {
        codigo: '06310',
        comuna: 'Santa Cruz',
        provincia: {
            region: {
                region: 'Región del Libertador Gral. Bernardo O\'Higgins'
            }
        }
    }
};

// Test that selector correctly obtains a simple value.
test('selector correctly obtains a simple value', () => {
    expect(__.selector(data, '(rut)')).toBe('1');
});

// Test that selector correctly concatenates two values with a hyphen.
test('selector correctly concatenates two values with a hyphen', () => {
    expect(__.selector(data, '(rut)"-"(dv)')).toBe('1-9');
});

// Test that selector concatenates a value and text.
test('selector concatenates a value and text', () => {
    expect(__.selector(data, '(razon_social)" ("(rut)"-"(dv)")"')).toBe('Esteban (1-9)');
});

// Test that selector concatenates text, two values, and other text.
test('selector concatenates text, two values, and other text', () => {
    expect(__.selector(data, '"("(rut)"-"(dv)"): "(razon_social)')).toBe('(1-9): Esteban');
});

// Test that selector accesses a nested value and concatenates it with another nested value.
test('selector accesses a nested value and concatenates it with another nested value', () => {
    expect(__.selector(data, '(comuna.comuna)" ("(comuna.provincia.region.region)")"')).toBe('Santa Cruz (Región del Libertador Gral. Bernardo O\'Higgins)');
});

// Test that selector correctly handles the absence of a field.
test('selector correctly handles the absence of a field', () => {
    expect(__.selector(data, '(direccion)')).toBe('');
});

// Test that selector correctly handles a missing field in a concatenation.
test('selector correctly handles a missing field in a concatenation', () => {
    expect(__.selector(data, '(rut)"-"(direccion)')).toBe('1-');
});

// Test that selector correctly handles the absence of nested fields.
test('selector correctly handles the absence of nested fields', () => {
    expect(__.selector(data, '(comuna.provincia.noexiste)" ("(comuna.provincia.region.region)")"')).toBe('(Región del Libertador Gral. Bernardo O\'Higgins)');
});
