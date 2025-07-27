/*! Form tables functions | (c) 2025 Derafu DEV | MIT */

// Object where form tables functions will be assigned.
const FormTables = {};

/**
 * Adds a new row to a table in a form.
 * This function is useful for dynamically expanding forms with multiple
 * entries.
 *
 * @param {string} id - ID of the table where fields should be added.
 * @param {HTMLElement} [trigger] - Element that triggered the addition, used to
 * focus the new field.
 * @param {Function} [callback] - Callback function that executes after adding
 * the new row.
 * @returns {void}
 */
FormTables.addJS = function (id, trigger, callback) {
    'use strict';
    const tbody = document.getElementById(id).getElementsByTagName('tbody')[0];

    // Insert the new row in the table.
    tbody.insertAdjacentHTML('beforeend', window[`inputsJS_${id}`]);

    // Process form elements that require adjustments.
    FormFields.fixFields(tbody.lastElementChild);

    // If a trigger is provided, focus the first field of the new row.
    if (trigger instanceof HTMLElement) {
        const newRow = tbody.lastElementChild;
        const firstInput = newRow.querySelector('input, select, textarea');
        if (firstInput) {
            firstInput.focus();
        }
    }

    // Execute the callback if provided.
    if (typeof callback === 'function') {
        const newRow = tbody.lastElementChild;
        callback(newRow);
    }
};

/**
 * Removes a row from a table in a form.
 * This function is useful for dynamically removing rows added to forms.
 *
 * @param {HTMLElement} link - Link element (<a>) that is part of the row to be
 * removed.
 * @returns {void}
 */
FormTables.delJS = function (link) {
    'use strict';
    if (!(link instanceof HTMLElement)) {
        console.error(
            'FormTables.delJS: The provided element is not a valid HTML element.',
        );
        return;
    }
    link.closest('tr').remove();
};

/**
 * Dynamically updates the rows of a checkbox table based on a list of options.
 * Useful for representing and selecting a set of categorized options.
 *
 * @param {string} tableID - Identifier of the table element to be modified.
 * @param {string} name - Name assigned to the checkboxes.
 * @param {Object} optionsList - Object with options indexed by a higher
 * category.
 * @param {string} selectedCategory - Selected category from which options are
 * wanted to be loaded.
 * @param {Array} keys - Object attributes that correspond to the key of each
 * row.
 * @param {Array} cols - Object attributes that are desired to be displayed as
 * columns in the table.
 * @param {number} [keepRows] - Number of rows that should be kept at the
 * beginning of the table. Default is 0.
 * @returns {void}
 */
FormTables.updateTablecheck = function (
    tableID,
    name,
    optionsList,
    selectedCategory,
    keys,
    cols,
    keepRows,
) {
    'use strict';
    if (keepRows === undefined) {
        keepRows = 0;
    }
    const tableBody = document.getElementById(tableID).tBodies[0];
    if (!tableBody) {
        console.error(
            `FormTables.updateTablecheck: Table body with ID '${tableID}' not found.`,
        );
        return;
    }

    // Clear existing rows, except the first 'keepRows'.
    while (tableBody.rows.length > keepRows) {
        tableBody.deleteRow(keepRows);
    }

    // Get options for the selected category.
    let options = optionsList[selectedCategory];
    if (!options) {
        console.warn(
            `FormTables.updateTablecheck: No options found for category '${selectedCategory}'.`,
        );
        return;
    }
    if (!Array.isArray(options)) {
        options = [options]; // Ensure options is an array.
    }

    // Add new rows to the table.
    options.forEach(option => {
        const row = tableBody.insertRow();
        cols.forEach(col => {
            const cell = row.insertCell();
            cell.textContent = option[col];
        });

        // Add cell for the checkbox.
        const checkboxCell = row.insertCell();
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = `${name}[]`;
        checkbox.value = keys.map(key => option[key]).join(';');
        checkboxCell.appendChild(checkbox);
    });
};

// Export module for use in node.js.
if (typeof module === 'object' && module.exports) {
    module.exports = FormTables;
}
