/*! Form fields functions | (c) 2025 Derafu DEV | MIT */

// Object where form fields functions will be assigned.
const FormFields = {};

/**
 * Sends a form via POST to a specific URL.
 * Can optionally open the form in a new window.
 *
 * @param {string} url URL where the form should be sent.
 * @param {Object} data Object with the variables to pass to the form.
 * @param {boolean} [newWindow] Indicates if the form should be opened in a new
 * window.
 * @returns {void}
 */
FormFields.post = function (url, data, newWindow) {
    'use strict';
    if (typeof url !== 'string' || typeof data !== 'object') {
        console.error('FormFields.post: Invalid arguments.');
        return;
    }
    if (newWindow === undefined) {
        newWindow = false;
    }

    const form = document.createElement('form');
    form.method = 'post';
    form.action = url;
    if (newWindow) {
        form.target = '_blank';
    }

    Object.keys(data).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = data[key];
        form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
};

/**
 * Allows toggling the display of a password field between hidden and visible.
 *
 * Changes the input type from 'password' to 'text' and vice versa, and updates
 * the corresponding icon.
 *
 * @param {HTMLElement} button - Button used to activate the function, located
 * next to the password field.
 * @returns {void}
 */
FormFields.showPassword = function (button) {
    'use strict';
    if (!(button instanceof HTMLElement)) {
        console.error(
            'FormFields.showPassword: The provided argument is not a valid HTML element.',
        );
        return;
    }

    // Try to find the related password field.
    const input = button
        .closest('.input-group')
        .querySelector('input[type="password"], input[type="text"]');
    const icon = button.querySelector('i');

    // Check if the necessary elements are present.
    if (!input || !icon) {
        console.error('FormFields.showPassword: Input or icon not found.');
        return;
    }

    // Toggle between showing and hiding the password.
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fa-regular fa-eye-slash fa-fw';
    } else {
        input.type = 'password';
        icon.className = 'fa-regular fa-eye fa-fw';
    }
};

/**
 * Allows editing the content of a text field in a larger dialog box.
 * Useful for text fields with extensive content that would benefit from an
 * expanded view.
 *
 * @param {HTMLElement} field - Text field that is desired to be edited in a
 * larger dialog box.
 * @returns {void}
 */
FormFields.growup = function (field) {
    'use strict';
    if (!(field instanceof HTMLElement)) {
        console.error(
            'FormFields.growup: The provided argument is not a valid HTML element.',
        );
        return;
    }

    const maxLength = field.getAttribute('maxlength');
    bootbox.prompt({
        title: `Edit field: ${field.name.replace('[]', '')}`,
        inputType: 'textarea',
        value: field.value,
        rows: 5,
        backdrop: true,
        centerVertical: true,
        buttons: {
            confirm: {
                label: 'Save changes',
                className: 'btn-success',
            },
            cancel: {
                label: 'Cancel',
                className: 'btn-danger',
            },
        },
        callback(result) {
            if (result !== null) {
                field.value = maxLength
                    ? result.substring(0, maxLength)
                    : result;
            }
        },
    });
};

/**
 * Changes the check state of a group of checkboxes with the same name.
 *
 * @param {string} name - Name of the checkbox array to modify.
 * @param {boolean} checked - Check state to apply to the checkboxes.
 * @returns {void}
 */
FormFields.checkboxesSet = function (name, checked) {
    'use strict';
    const checkboxes = document.querySelectorAll(`input[name='${name}[]']`);
    checkboxes.forEach(function (checkbox) {
        checkbox.checked = checked;
    });
};

/**
 * Removes options from a select element.
 *
 * @param {HTMLSelectElement} selectbox - Select element to be cleared.
 * @param {number} [from] - Index from which to start removing options.
 * Default is 0.
 * @returns {void}
 */
FormFields.removeOptions = function (selectbox, from) {
    'use strict';
    if (from === undefined) {
        from = 0;
    }
    if (!(selectbox instanceof HTMLSelectElement)) {
        console.error(
            'FormFields.removeOptions: The provided element is not a valid select.',
        );
        return;
    }
    while (selectbox.options.length > from) {
        selectbox.remove(from);
    }
};

/**
 * Adds options to a select element using a list of options.
 *
 * @param {string} selectID - Identifier of the select element to modify.
 * @param {Object} opcionesListado - Object with options indexed by a higher
 * category.
 * @param {string} seleccionada - Selected category from which options are
 * wanted to be loaded.
 * @param {number} [dejar] - Number of initial options that should be kept when
 * updating. Default is 1.
 * @returns {void}
 */
FormFields.addOptions = function (
    selectID,
    opcionesListado,
    seleccionada,
    dejar,
) {
    'use strict';
    const select = document.getElementById(selectID);
    if (!select) {
        console.error(
            `FormFields.addOptions: No select element found with ID '${selectID}'.`,
        );
        return;
    }
    if (dejar === undefined) {
        dejar = 1;
    }

    FormFields.removeOptions(select, dejar);
    select.disabled = opcionesListado[seleccionada] === undefined;
    if (!select.disabled) {
        const opciones =
            opcionesListado[seleccionada] instanceof Array
                ? opcionesListado[seleccionada]
                : [opcionesListado[seleccionada]];
        opciones.forEach(function (opcion) {
            const option = document.createElement('option');
            option.value = opcion.id;
            option.textContent = opcion.glosa;
            select.appendChild(option);
        });
    }
};

/**
 * Processes form elements that require additional configuration or
 * initialization within a specific element. This method searches for elements
 * that have specific attributes, such as `data-wrapper-method` and
 * `data-wrapper-config`, and applies the required configuration or
 * initialization, such as activating select2 with specific options.
 *
 * @param {Element} element - The DOM element in which to search and process
 * fields. Usually would be a row recently inserted in a table.
 * @returns {void}
 */
FormFields.fixFields = function (element) {
    'use strict';
    // Check if window or jQuery is not defined and return immediately.
    if (typeof window === 'undefined' || typeof window.jQuery !== 'function') {
        console.error('window or jQuery is not available.');
        return;
    }
    // If element is not provided, use the entire document body.
    if (element === undefined) {
        element = document.body;
    }
    // Adjust select fields through their wrapper if it exists.
    const selects = element.querySelectorAll('select[data-wrapper-method]');
    selects.forEach(function (select) {
        const method = select.getAttribute('data-wrapper-method');
        let config = select.getAttribute('data-wrapper-config');
        if (method && config) {
            try {
                if (typeof $(select)[method] === 'function') {
                    config = JSON.parse(config.replace(/'/g, '"'));
                    if (method === 'select2') {
                        const width = Math.round(select.offsetWidth);
                        if (width) {
                            // Fix size prevents overflow in tables.
                            config['width'] = `${width}px`;
                        } else {
                            // TODO: if there's no size, some width should be
                            // assigned or something should be done because as
                            // it is, without width, it stays at 100% and
                            // overflows the same in these cases where there's
                            // no width of the select field. Using:
                            // let width = Math.round(select.parentElement.offsetWidth);
                            // didn't work either. New ideas?
                        }
                    }
                    // Initialize (e.g., select2) in the select field.
                    $(select)[method](config);
                }
            } catch (e) {
                console.error('Error parsing data-wrapper-config: ', e);
            }
        }
    });
    // Adjust input fields that use datepicker.
    const dates = element.querySelectorAll('input[data-datepicker-config]');
    dates.forEach(function (date) {
        // Datepicker configuration.
        const defaultConfig = {
            format: 'yyyy-mm-dd',
            weekStart: 1,
            todayBtn: 'linked',
            language: 'es',
            todayHighlight: true,
            orientation: 'auto',
            autoclose: true,
        };
        let elementConfig;
        try {
            elementConfig = date.getAttribute('data-datepicker-config')
                ? JSON.parse(
                      date
                          .getAttribute('data-datepicker-config')
                          .replace(/'/g, '"'),
                  )
                : {};
        } catch (e) {
            elementConfig = {};
            console.error('Error parsing data-datepicker-config: ', e);
        }
        const config = { ...defaultConfig, ...elementConfig };
        // Initialize datepicker according to configuration.
        if (config.format === 'yyyymm' && date.value) {
            const year = date.value.substring(0, 4);
            const month = date.value.substring(4, 6) - 1;
            $(date)
                .datepicker(config)
                .datepicker('update', new Date(year, month));
        } else {
            $(date).datepicker(config);
        }
    });
};

// Fix form fields automatically when loading the script.
document.addEventListener('DOMContentLoaded', function () {
    FormFields.fixFields();
});

// Export module for use in node.js.
if (typeof module === 'object' && module.exports) {
    module.exports = FormFields;
}
