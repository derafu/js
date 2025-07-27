/*! Form validation functions | (c) 2025 Derafu DEV | MIT */

// Object where form validation functions will be assigned.
const FormValidation = {};

/**
 * [DEPRECATED] Creates and displays a loading message in a modal dialog using
 * bootbox. Useful for indicating to the user that an operation is in progress.
 *
 * @deprecated This function is deprecated and will be removed in future
 * versions. Use UI.loading() instead.
 * @param {string} message - Message to show to the user.
 * @returns {*} Returns the result of UI.loading().
 */
FormValidation.loading = function (message) {
    'use strict';
    console.warn(
        'FormValidation.loading() is deprecated. Use UI.loading() instead.',
    );
    return UI.loading(message);
};

/**
 * [DEPRECATED] Creates and displays an alert dialog using bootbox.
 * Useful for showing warning or information messages to the user.
 *
 * @deprecated This function is deprecated and will be removed in future
 * versions. Use UI.alert() instead.
 * @param {string} message - Message to show to the user.
 * @param {HTMLElement} [element] - Element to focus after closing the dialog.
 * @returns {*} Returns the result of UI.alert().
 */
FormValidation.alert = function (message, element) {
    'use strict';
    console.warn(
        'FormValidation.alert() is deprecated. Use UI.alert() instead.',
    );
    return UI.alert(message, element);
};

/**
 * [DEPRECATED] Creates a confirmation dialog using bootbox.
 * Useful for requesting user confirmation before performing an action, such as
 * submitting a form.
 *
 * @deprecated This function is deprecated and will be removed in future
 * versions. Use UI.confirm() instead.
 * @param {HTMLElement} element - Element (form or a) that is being confirmed.
 * @param {string} [message] - Message to show to the user.
 * @param {string} [loading] - Loading message to show during the operation.
 * @returns {*} Returns the result of UI.confirm().
 */
FormValidation.confirm = function (element, message, loading) {
    'use strict';
    console.warn(
        'FormValidation.confirm() is deprecated. Use UI.confirm() instead.',
    );
    return UI.confirm(element, message, loading);
};

/**
 * Performs form field validation, applying different checks according to the
 * assigned CSS classes. The checks include non-emptiness, data type, specific
 * format, among others.
 *
 * @param {string} [formId] - ID of the form to validate. If not provided, all
 * fields with "check" class are validated.
 * @returns {boolean} Returns true if all fields pass the validations, false
 * otherwise.
 */
FormValidation.check = function (formId) {
    'use strict';
    let form;
    let fields;
    let isValid = true;

    try {
        form = formId
            ? document.getElementById(formId)
            : document.querySelector('form');
        fields = form.getElementsByClassName('check');
    } catch (error) {
        console.error(
            'FormValidation.check: Error searching for fields to validate in the form: ',
            error,
        );
        return false;
    }

    for (const field of fields) {
        if (field.disabled) {
            continue;
        }

        try {
            field.value = field.value.trim();
        } catch (error) {
            // Silently fail on fields that are not: input, select, or textarea.
        }

        const checks = field.className.replace('check ', '').split(' ');
        if (
            checks.indexOf('notempty') === -1 &&
            (typeof Utils !== 'undefined'
                ? Utils.empty(field.value)
                : field.value === null ||
                  field.value === undefined ||
                  field.value === '')
        ) {
            field.classList.remove('is-invalid');
            field.classList.remove('is-valid');
            continue;
        }

        for (const check of checks) {
            if (check === '') {
                continue;
            }

            const checkFunction = FormValidation.check[check];
            if (typeof checkFunction === 'function') {
                const status = checkFunction(field);
                if (status !== true) {
                    field.classList.add('is-invalid');
                    field.classList.remove('is-valid');
                    isValid = false;

                    typeof UI !== 'undefined'
                        ? UI.alert(
                              status.replace(
                                  '%s',
                                  FormValidation.getFieldLabel(field),
                              ),
                              field,
                          )
                        : alert(
                              status.replace(
                                  '%s',
                                  FormValidation.getFieldLabel(field),
                              ),
                          );

                    try {
                        field.select();
                    } catch (error) {
                        // Silently fail when the select() method is not
                        // available on the field.
                    }

                    return false;
                } else {
                    field.classList.remove('is-invalid');
                    field.classList.add('is-valid');
                }
            }
        }
    }

    if (isValid) {
        form.classList.add('was-validated');
    } else {
        form.classList.remove('was-validated');
    }

    return true;
};

/**
 * [DEPRECATED] Validates that a field is not empty.
 *
 * @deprecated This function is deprecated and will be removed in future
 * versions. Use FormValidation.check.notempty() instead.
 * @param {HTMLElement} field - Field to validate.
 * @returns {string|boolean} Returns the result of
 * FormValidation.check.notempty().
 */
FormValidation.check_notempty = function (field) {
    'use strict';
    console.warn(
        'FormValidation.check_notempty() is deprecated. Use FormValidation.check.notempty() instead.',
    );
    return FormValidation.check.notempty(field);
};

/**
 * Validates that a field is not empty.
 * Uses the Utils.empty() function to determine if the field is empty.
 *
 * @param {HTMLElement} field - Field to validate.
 * @returns {string|boolean} Returns an error message if the field is empty, or
 * true if it is not.
 */
FormValidation.check.notempty = function (field) {
    'use strict';
    if (!(field instanceof HTMLElement)) {
        console.error(
            'FormValidation.check.notempty: The provided argument is not a valid HTML element.',
        );
        return 'The provided field is not valid!';
    }
    if (field.type === 'checkbox') {
        if (!field.checked) {
            return 'You must check the box: %s!';
        }
    } else if (
        typeof Utils !== 'undefined'
            ? Utils.empty(field.value)
            : field.value === null ||
              field.value === undefined ||
              field.value === ''
    ) {
        return '%s cannot be blank!';
    }
    return true;
};

/**
 * Validates that a field contains an integer.
 * Uses the Utils.isInt() function for validation.
 *
 * @param {HTMLElement} field - Field to validate.
 * @returns {string|boolean} Returns an error message if the field does not
 * contain an integer, or true if it does.
 */
FormValidation.check.integer = function (field) {
    'use strict';
    if (!(field instanceof HTMLElement)) {
        console.error(
            'FormValidation.check.integer: The provided argument is not a valid HTML element.',
        );
        return 'The provided field is not valid!';
    }
    if (
        typeof Utils !== 'undefined'
            ? !Utils.isInt(field.value)
            : !Number.isInteger(parseFloat(field.value))
    ) {
        return '%s must be an integer!';
    }
    field.value = parseInt(field.value, 10);
    return true;
};

/**
 * [DEPRECATED] Validates that a field contains a real number (integer or
 * decimal).
 *
 * @deprecated This function is deprecated and will be removed in future
 * versions. Use FormValidation.check.real() instead.
 * @param {HTMLElement} field - Field to validate.
 * @returns {string|boolean} Returns the result of
 * FormValidation.check.real().
 */
FormValidation.check_real = function (field) {
    'use strict';
    console.warn(
        'FormValidation.check_real() is deprecated. Use FormValidation.check.real() instead.',
    );
    return FormValidation.check.real(field);
};

/**
 * Validates that a field contains a real number (integer or decimal).
 * Uses the Utils.isInt() and Utils.isFloat() functions for validation.
 *
 * @param {HTMLElement} field - Field to validate.
 * @returns {string|boolean} Returns an error message if the field does not
 * contain a real number, or true if it does.
 */
FormValidation.check.real = function (field) {
    'use strict';
    if (!(field instanceof HTMLElement)) {
        console.error(
            'FormValidation.check.real: The provided argument is not a valid HTML element.',
        );
        return 'The provided field is not valid!';
    }
    field.value = field.value.replace(',', '.');
    if (
        typeof Utils !== 'undefined'
            ? !Utils.isInt(field.value) && !Utils.isFloat(field.value)
            : !Number.isInteger(parseFloat(field.value)) &&
              !field.value.includes('.')
    ) {
        return '%s must be an integer or decimal number!';
    }
    field.value = parseFloat(field.value);
    return true;
};

/**
 * [DEPRECATED] Validates that a field contains a valid email address.
 *
 * @deprecated This function is deprecated and will be removed in future
 * versions. Use FormValidation.check.email() instead.
 * @param {HTMLElement} field - Field to validate.
 * @returns {string|boolean} Returns the result of
 * FormValidation.check.email().
 */
FormValidation.check_email = function (field) {
    'use strict';
    console.warn(
        'FormValidation.check_email() is deprecated. Use FormValidation.check.email() instead.',
    );
    return FormValidation.check.email(field);
};

/**
 * Validates that a field contains a valid email address.
 * Uses a regular expression for validation.
 *
 * @param {HTMLElement} field - Field to validate.
 * @returns {string|boolean} Returns an error message if the field does not
 * contain a valid email address, or true if it does.
 */
FormValidation.check.email = function (field) {
    'use strict';
    const emailRegex =
        /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!(field instanceof HTMLElement)) {
        console.error(
            'FormValidation.check.email: The provided argument is not a valid HTML element.',
        );
        return 'The provided field is not valid!';
    }
    if (!emailRegex.test(field.value)) {
        return '%s is not valid!';
    }
    return true;
};

/**
 * Validates that a field contains one or several valid email addresses.
 * Uses a regular expression for validation.
 *
 * @param {HTMLElement} field - Field to validate.
 * @returns {string|boolean} Returns an error message if the field does not
 * contain valid emails, or true if it does.
 */
FormValidation.check.emails = function (field) {
    'use strict';
    const emailRegex =
        /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!(field instanceof HTMLElement)) {
        console.error(
            'FormValidation.check.emails: The provided argument is not a valid HTML element.',
        );
        return 'The provided field is not valid!';
    }
    field.value = field.value.replace(/ /g, '');
    const emails = field.value
        .replace(/\n/g, ';')
        .replace(/,/g, ';')
        .split(';');
    for (let i = 0; i < emails.length; i++) {
        if (!emailRegex.test(emails[i])) {
            return '%s is not valid!';
        }
    }
    return true;
};

/**
 * Validates that a field contains a date in YYYY-MM-DD format.
 * Uses a regular expression for validation.
 *
 * @param {HTMLElement} field - Field to validate.
 * @returns {string|boolean} Returns an error message if the field does not
 * contain a valid date, or true if it does.
 */
FormValidation.check.date = function (field) {
    'use strict';
    const dateRegex = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;
    if (!(field instanceof HTMLElement)) {
        console.error(
            'FormValidation.check.date: The provided argument is not a valid HTML element.',
        );
        return 'The provided field is not valid!';
    }
    if (!dateRegex.test(field.value)) {
        return '%s must be in YYYY-MM-DD format!';
    }
    return true;
};

/**
 * Validates that a field contains a phone number in specific format.
 * Example of valid format: +56 9 87654321
 * Uses a regular expression for validation.
 *
 * @param {HTMLElement} field - Field to validate.
 * @returns {string|boolean} Returns an error message if the field does not
 * contain a valid phone number, or true if it does.
 */
FormValidation.check.telephone = function (field) {
    'use strict';
    const phoneRegex =
        /^(?:\+\d{1,4}\s?)?(?:(\d{1,3})[\s-]?)?(\d{3,4})[\s-]?(\d{4})$/;
    if (!(field instanceof HTMLElement)) {
        console.error(
            'FormValidation.check.telephone: The provided argument is not a valid HTML element.',
        );
        return 'The provided field is not valid!';
    }
    if (!phoneRegex.test(field.value)) {
        return '%s must be a valid phone number!';
    }
    return true;
};

/**
 * [DEPRECATED] Validates that a field contains a valid Chilean RUT.
 *
 * @deprecated This function is deprecated and will be removed in future
 * versions. Use FormValidation.check.rut() instead.
 * @param {HTMLElement} field - Field to validate.
 * @returns {string|boolean} Returns the result of
 * FormValidation.check.rut().
 */
FormValidation.check_rut = function (field) {
    'use strict';
    console.warn(
        'FormValidation.check_rut() is deprecated. Use FormValidation.check.rut() instead.',
    );
    return FormValidation.check.rut(field);
};

/**
 * Validates that a field contains a valid Chilean RUT.
 * Uses the ValidationL10nCl.rut() function to determine if the RUT is valid or not.
 *
 * @param {HTMLElement} field - Field to validate.
 * @returns {string|boolean} Returns an error message if the RUT is not valid,
 * or true if it is.
 */
FormValidation.check.rut = function (field) {
    'use strict';
    if (!(field instanceof HTMLElement)) {
        console.error(
            'FormValidation.check.rut: The provided argument is not a valid HTML element.',
        );
        return 'The provided field is not valid!';
    }
    const rut =
        typeof ValidationL10nCl !== 'undefined'
            ? ValidationL10nCl.rut(field.value, true)
            : false;
    if (rut === false) {
        return '%s is not valid!';
    }
    field.value = rut;
    return true;
};

/**
 * Gets the label of a form field.
 * First looks for a label element within the form group where the field is
 * located.
 * If no label is found, uses the field's placeholder.
 * If neither label nor placeholder is available, uses the field's name.
 *
 * @param {HTMLElement} field - Form field from which the label is wanted.
 * @returns {string} Text of the label associated with the field, its placeholder,
 * or its name.
 */
FormValidation.getFieldLabel = function (field) {
    'use strict';
    const formGroup = field.parentNode.parentNode;
    const label_element = formGroup.querySelector('label');
    let label;
    if (label_element) {
        label = label_element.textContent.replace('* ', '');
    } else {
        label = field.placeholder;
    }
    return label ? label : field.name;
};

// Export module for use in node.js.
if (typeof module === 'object' && module.exports) {
    module.exports = FormValidation;
}
