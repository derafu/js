/*! Utility functions | (c) 2025 Derafu DEV | MIT */

// Object where utility functions will be assigned.
const Utils = {};

/**
 * Generates a secure password using alphanumeric characters and special
 * symbols.
 * If the browser supports crypto.getRandomValues(), it is used to ensure
 * cryptographic randomness. Otherwise, Math.random() is used as a less secure
 * alternative.
 *
 * @param {number} length - Desired password length. Default length is 12
 * characters.
 * @returns {string} Password generated securely.
 */
Utils.generatePassword = function (length) {
    'use strict';

    // Default length of 12 characters, considered secure for most purposes.
    length = length || 12;

    // Warning if the requested length is less than 8 characters.
    if (length < 8) {
        console.warn(
            'Password length is less than 8 characters. A minimum ' +
                'length of 8 characters is recommended for greater security.',
        );
    }

    const charset =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let password = '';

    if (window.crypto && window.crypto.getRandomValues) {
        const array = new Uint32Array(length);
        window.crypto.getRandomValues(array);

        for (let i = 0; i < length; i++) {
            password += charset.charAt(array[i] % charset.length);
        }
    } else {
        // If for some reason the browser doesn't support crypto, which is
        // unlikely in modern browsers.
        for (let i = 0; i < length; i++) {
            password += charset.charAt(
                Math.floor(Math.random() * charset.length),
            );
        }
    }

    return password;
};

/**
 * Gets the value of a cookie by its name.
 *
 * @param {string} name - Cookie name.
 * @returns {string|null} Cookie value or null if not found.
 */
Utils.getCookie = function (name) {
    'use strict';

    // Check if we're in a browser environment.
    if (typeof document === 'undefined') {
        // Node.js environment - cookies not available.
        return null;
    }

    const cookieArray = document.cookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        const cookiePair = cookieArray[i].split('=');
        if (name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
};

/**
 * Gets the user's language, either from a cookie or from the browser, and
 * verifies if it's in a list of allowed languages. If not, returns a default
 * language.
 *
 * @param {string} [cookieName] - Cookie name to search for. Default is
 * 'app_user_language'.
 * @returns {string} Language code to use.
 */
Utils.getUserLanguage = function (cookieName) {
    'use strict';
    if (Utils._userLanguage) {
        return Utils._userLanguage;
    }

    // List of allowed languages (the first language will be the default).
    // Format: Accept-Language HTTP header (generally represented in lowercase).
    const allowedLanguages = ['es-cl', 'es-es', 'en-us'];

    // Check if we're in a browser environment.
    if (typeof navigator === 'undefined') {
        // Node.js environment - return default language.
        Utils._userLanguage = allowedLanguages[0];
        return allowedLanguages[0];
    }

    // Try to get language from a cookie.
    if (cookieName === undefined) {
        cookieName = 'app_user_language';
    }
    const cookieLanguage = Utils.getCookie(cookieName);
    if (cookieLanguage) {
        const cookieLanguageLower = cookieLanguage.toLowerCase();
        if (allowedLanguages.includes(cookieLanguageLower)) {
            Utils._userLanguage = cookieLanguageLower;
            return cookieLanguageLower;
        }
    }

    // Get browser language.
    const browserLanguage = navigator.language.toLowerCase();
    if (allowedLanguages.includes(browserLanguage)) {
        Utils._userLanguage = browserLanguage;
        return browserLanguage;
    }

    // Return default language if browser language is not in the list.
    Utils._userLanguage = allowedLanguages[0];
    return allowedLanguages[0];
};
Utils._userLanguage = null;

/**
 * Method that formats a number using thousands separator. If 'decimalDigits' is
 * not specified, 0 is assumed. If 'true' is passed, 2 decimals are used.
 *
 * @param {number} n - Number to format.
 * @param {number|boolean} decimalDigits - Number of decimal digits or true to
 * use 2. If not provided, 0 is assumed.
 * @param {string} [language] - Language to use for number formatting. Default
 * is obtained with Utils.getUserLanguage().
 * @returns {string} Number formatted according to locale.
 */
Utils.num = function (n, decimalDigits, language) {
    'use strict';
    if (typeof n === 'undefined') {
        return '0';
    }

    if (typeof n === 'string') {
        n = n.includes('.') ? parseFloat(n) : parseInt(n, 10);
    }

    if (typeof n !== 'number' || isNaN(n)) {
        console.error('num: The provided argument is not a valid number.');
        return n;
    }

    if (decimalDigits === undefined) {
        decimalDigits = 0;
    }
    decimalDigits = decimalDigits === true ? 2 : decimalDigits;
    if (
        typeof decimalDigits !== 'number' ||
        isNaN(decimalDigits) ||
        decimalDigits < 0
    ) {
        console.error(
            'num: The provided number of decimal digits is not valid.',
        );
        return n;
    }

    const options = {
        minimumFractionDigits: decimalDigits,
        maximumFractionDigits: decimalDigits,
    };
    if (language === undefined) {
        language = Utils.getUserLanguage();
    }

    // Map language codes to proper locales for number formatting.
    let locale = language;
    if (language === 'es-cl') {
        locale = 'es-CL';
    } else if (language === 'es-es') {
        locale = 'es-ES';
    } else if (language === 'en-us') {
        locale = 'en-US';
    }

    return new Intl.NumberFormat(locale, options).format(n);
};

/**
 * Checks if an object, array, or primitive value is empty. Considers as empty
 * any null, undefined, empty string, NaN number, invalid date, empty array, a
 * literal object without properties, or an HTML element of type input, select,
 * or textarea with empty value.
 *
 * @param {Object|Array|Date|String|Number|HTMLElement} obj - Object, array,
 * primitive value, or HTML element to check.
 * @returns {boolean} Returns true if empty, otherwise false.
 */
Utils.empty = function (obj) {
    'use strict';
    if (obj === null || obj === undefined || obj === '') {
        return true;
    }
    if (typeof obj === 'number' && isNaN(obj)) {
        return true;
    }
    if (obj instanceof Date) {
        if (isNaN(obj.getTime())) {
            return true;
        } else {
            return false;
        }
    }
    if (Array.isArray(obj)) {
        return obj.length === 0;
    }
    if (
        obj instanceof HTMLInputElement ||
        obj instanceof HTMLSelectElement ||
        obj instanceof HTMLTextAreaElement
    ) {
        return obj.value === '';
    }
    if (typeof obj === 'object') {
        return Object.keys(obj).length === 0;
    }
    return false;
};

/**
 * Checks if a value is an integer representation.
 * Considers integers both numbers and strings that can be converted to integers.
 *
 * @param {string|number} value - Value to check.
 * @returns {boolean} Returns true if the value is an integer, false otherwise.
 */
Utils.isInt = function (value) {
    'use strict';
    return typeof value === 'number'
        ? Number.isInteger(value)
        : Number.isInteger(parseFloat(value)) &&
              !isNaN(value) &&
              parseFloat(value).toString() === value.toString();
};

/**
 * Checks if a value is a floating-point number representation. Considers
 * floating-point numbers both numbers and strings that can be converted to
 * floating-point numbers, excluding integers.
 *
 * @param {string|number} value - Value to check.
 * @returns {boolean} Returns true if the value is a floating-point number,
 * false otherwise.
 */
Utils.isFloat = function (value) {
    'use strict';

    // If it's a number, but not an integer, then it's a floating-point number.
    if (typeof value === 'number') {
        return !Number.isInteger(value) && !isNaN(value);
    }

    // If it's a string, check if it's a floating-point number.
    // First, discard strings that cannot be converted to numbers.
    if (typeof value === 'string' && !isNaN(value) && value.trim() !== '') {
        // Then, discard integers.
        if (Utils.isInt(value)) {
            return false;
        }
        // Finally, check that the string contains a decimal point.
        return value.includes('.');
    }

    // For all other cases, it's not a floating-point number.
    return false;
};

/**
 * Generates an object with the values of the specified keys from a source object.
 *
 * @param {Array} keys - List of keys whose values are desired to be extracted
 * from the source object.
 * @param {Object} source - Source object from which values will be extracted.
 * @returns {Object} - Object with the values of the specified keys, where each
 * key is the original key name and the value is the corresponding value in the
 * source object.
 */
Utils.keyValues = function (keys, source) {
    const values = {};
    keys.forEach(function (key) {
        values[key] = source[key];
    });
    return values;
};

/**
 * Gets the value of an object based on a selector that allows concatenating
 * literal texts and object property values.
 *
 * The selector can include:
 *
 * - Literal texts between double quotes "".
 * - Object properties between parentheses ().
 *
 * @param {Object} obj - The object from which values will be extracted.
 * @param {string} path - The selector that specifies how to access and
 * concatenate object values.
 * @returns {string} - The result of concatenating the values specified by the
 * selector.
 */
Utils.selector = function (obj, path) {
    const regex = /\(([^)]+)\)|"([^"]*)"/g;
    let match;
    let result = '';
    while ((match = regex.exec(path)) !== null) {
        // It's a selector, get value from object.
        if (match[1]) {
            result +=
                match[1]
                    .split('.')
                    .reduce((acc, part) => acc && acc[part], obj) || '';
        }
        // It's a literal text, add as is.
        else if (match[2]) {
            result += match[2];
        }
    }
    // Return obtained result.
    return result.trim();
};

/**
 * Rounds a number to a specified number of decimal places with precise decimal
 * arithmetic. This function avoids floating-point precision issues that can
 * occur with standard Math.round().
 *
 * @param {number} n - The number to round.
 * @param {number} decimals - The number of decimal places to round to.
 * @returns {number} The rounded number.
 */
Utils.round = function (n, decimals) {
    return Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);
};

// Export module for use in Node.js.
if (typeof module === 'object' && module.exports) {
    module.exports = Utils;
}
