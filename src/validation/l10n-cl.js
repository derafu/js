/*! Chilean validation | (c) 2025 Derafu DEV | MIT */

// Object where Chilean RUT validation functions will be assigned.
const ValidationL10nCl = {};

/**
 * Validates and optionally formats a Chilean RUT (Rol Único Tributario).
 * Verifies that the check digit is correct and can return the formatted RUT.
 *
 * @param {string|number} value - The RUT to validate, can include dots, commas,
 * and dash.
 * @param {boolean} [format=false] - If true, returns the formatted RUT with
 * thousands separator and dash. If false or not provided, only validates the RUT.
 * @returns {boolean|string} If format is false, returns true if the RUT is
 * valid, otherwise false. If format is true, returns the formatted RUT if
 * valid, otherwise false.
 */
ValidationL10nCl.rut = function (value, format) {
    'use strict';
    const dv = value.slice(-1).toUpperCase();
    const rut = value
        .replace(/\./g, '')
        .replace(/,/g, '')
        .replace(/-/, '')
        .slice(0, -1);
    if (dv !== 'K' && isNaN(parseInt(dv, 10))) {
        return false;
    }
    if (dv !== ValidationL10nCl.rut.dv(rut)) {
        return false;
    }
    return format === true
        ? `${
              typeof Utils !== 'undefined'
                  ? Utils.num(rut, 0, 'es-CL')
                  : rut.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
          }-${dv}`
        : true;
};

/**
 * Calculates the check digit for a Chilean RUT (Rol Único Tributario).
 * Uses the standard algorithm to calculate the digit based on the RUT number.
 *
 * @param {string|number} numero - RUT without dots or check digit.
 * @returns {string} RUT check digit.
 */
ValidationL10nCl.rut.dv = function (numero) {
    'use strict';
    let suma = 0;
    let factor = 2;
    const rutReverso = numero.toString().split('').reverse().join('');

    for (const digito of rutReverso) {
        suma += parseInt(digito, 10) * factor;
        factor = factor === 7 ? 2 : factor + 1;
    }

    const dv = 11 - (suma % 11);
    return dv === 11 ? '0' : dv === 10 ? 'K' : dv.toString();
};

// Export module for use in node.js.
if (typeof module === 'object' && module.exports) {
    module.exports = ValidationL10nCl;
}
