/*! UI functions | (c) 2025 Derafu DEV | MIT */

// Object where UI functions will be assigned.
const UI = {};

/**
 * Opens a new browser window as a popup.
 *
 * @param {string} url - URL to open in the popup.
 * @param {number} w - Width of the popup window.
 * @param {number} h - Height of the popup window.
 * @param {string} [s] - Indicates if scrollbars are shown ("yes" or "no").
 * Default is "no".
 * @returns {boolean} Always returns false.
 */
UI.popup = function (url, w, h, s) {
    'use strict';
    if (s === undefined) {
        s = 'no';
    }
    window.open(
        url,
        '_blank',
        `width=${w},height=${h},directories=no,location=no,menubar=no,` +
            `scrollbars=${s},status=no,toolbar=no,resizable=no`,
    );
    return false;
};

/**
 * Creates and returns an HTML <table> element based on the provided data.
 *
 * @param {Object} titles - Object containing the column titles of the table.
 * @param {Array} data - Array of objects where each object represents a table
 * row.
 * @returns {HTMLElement} Constructed <table> element.
 */
UI.table = function (titles, data) {
    'use strict';
    const table = document.createElement('table');
    table.className = 'table table-striped';

    // Create table header.
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    Object.keys(titles).forEach(col => {
        const th = document.createElement('th');
        th.textContent = titles[col];
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body.
    const tbody = document.createElement('tbody');
    data.forEach(rowData => {
        const row = document.createElement('tr');
        Object.keys(titles).forEach(col => {
            const td = document.createElement('td');
            td.textContent = rowData[col];
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    return table;
};

/**
 * Shows a notification on screen.
 * Uses Notyf if available; otherwise uses bootbox.
 *
 * @param {string} message - Notification message.
 * @param {number} [duration] - Notification duration in milliseconds.
 * Default is 3000.
 * @param {string} [icon] - Font Awesome icon to prepend to the notification.
 * Default is 'fa-regular fa-bell'.
 * @param {string} [type] - Notyf notification type. Default is 'success'.
 * @returns {void}
 */
UI.notify = function (message, duration, icon, type) {
    'use strict';
    if (duration === undefined) {
        duration = 3000;
    }
    if (icon === undefined) {
        icon = 'fa-regular fa-bell';
    }
    if (type === undefined) {
        type = 'success';
    }

    // Check if Notyf is available.
    if (typeof Notyf !== 'undefined') {
        const notyf = new Notyf();
        notyf.open({
            type,
            icon: icon ? `<i class="${icon}"></i>` : false,
            message,
            duration,
            position: { x: 'right', y: 'bottom' },
            dismissible: true,
        });
    }

    // Use bootbox if Notyf is not available.
    else {
        icon = icon ? `<i class="${icon}"></i> ` : '';
        const bb = bootbox.dialog({
            message: `<div class="text-center">${icon}${message}</div>`,
            centerVertical: true,
            closeButton: false,
            onEscape: true,
        });
        if (duration) {
            setTimeout(() => {
                bb.modal('hide');
            }, duration);
        }
    }
};

/**
 * Copies a string to the clipboard and shows a confirmation message.
 *
 * @param {string|HTMLElement} source - String or element whose content will be
 * copied to the clipboard.
 * @param {string} [message] - Message to show after copying.
 * Default is 'Copied!'.
 * @returns {void}
 */
UI.copy = function (source, message) {
    'use strict';

    // Determine text to copy.
    let textToCopy;
    if (typeof source === 'string') {
        textToCopy = source;
    } else if (source instanceof HTMLElement) {
        if (source.tagName === 'INPUT' || source.tagName === 'TEXTAREA') {
            textToCopy = source.value;
        } else {
            textToCopy = source.innerText;
        }
    } else {
        console.error(
            "The 'source' parameter must be a string or an HTML element.",
        );
        return;
    }

    // Define default message if not provided.
    if (message === undefined) {
        message = 'Copied!';
    }

    // Copy text to clipboard.
    navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
            UI.notify(message, 3000, 'fa-regular fa-copy');
        })
        .catch(err => {
            console.error('Error copying text: ', err);
        });
};

/**
 * Pastes text from the clipboard into a form element, returns it as a string,
 * or executes a callback with the pasted text.
 *
 * @param {HTMLElement|function} target - Element where clipboard text will be
 * pasted or callback that receives the text.
 * @param {string} [message] - Message to show after pasting.
 * Default is 'Pasted!'.
 * @returns {void}
 */
UI.paste = function (target, message) {
    'use strict';

    // Define default message if not provided.
    if (message === undefined) {
        message = 'Pasted!';
    }

    // Paste text from clipboard.
    navigator.clipboard
        .readText()
        .then(text => {
            if (typeof target === 'function') {
                target(text);
            } else if (target instanceof HTMLElement) {
                if (
                    target.tagName === 'INPUT' ||
                    target.tagName === 'TEXTAREA'
                ) {
                    target.value = text;
                } else {
                    target.innerText = text;
                }
            } else {
                console.error(
                    "The 'target' parameter must be an HTML element or a function.",
                );
                return;
            }

            UI.notify(message, 3000, 'fa-regular fa-paste');
        })
        .catch(err => {
            console.error('Error pasting text: ', err);
        });
};

/**
 * Creates a form to share a message by phone.
 *
 * @param {string} telephone - Predefined phone number for the message.
 * @param {string} message - Message to share.
 * @param {string} [method] - Sharing method (default is whatsapp).
 * @returns {void}
 */
UI.share = function (telephone, message, method) {
    'use strict';
    if (method === undefined) {
        method = 'whatsapp';
    }
    bootbox.prompt({
        title: `Send message via ${method}`,
        message: '<p>Phone:</p>',
        centerVertical: true,
        locale: 'es',
        backdrop: true,
        buttons: {
            confirm: {
                label: 'Send',
                className: 'btn-success',
            },
            cancel: {
                className: 'btn-danger',
            },
        },
        value: telephone ? telephone : '+56 9 ',
        callback(telephone) {
            if (telephone) {
                telephone = telephone.replace(/\+| /g, '');
                if (method === 'whatsapp') {
                    const url = `https://wa.me/${telephone}?text=${encodeURI(message)}`;
                    const win = window.open(url, '_blank');
                    win.focus();
                }
            }
        },
    });
};

/**
 * Creates and displays a loading message in a modal dialog using bootbox.
 * Useful for indicating to the user that an operation is in progress.
 *
 * @param {string} [message] - Message to show to the user.
 * Default is 'Loading...'.
 * @returns {boolean} Always returns true, indicating that the loading message
 * was shown.
 */
UI.loading = function (message) {
    'use strict';

    // Assign default message if none was passed.
    if (message === undefined) {
        message = 'Loading...';
    }

    // Validate that the message is a string.
    if (typeof message !== 'string') {
        console.error(
            'UI.loading: The provided message is not a valid string.',
        );
        return false;
    }

    bootbox.dialog({
        message: `<div class="text-center"><i class="fa fa-spin fa-spinner"></i> ${message}</div>`,
        centerVertical: true,
        closeButton: false,
        onEscape: false,
    });

    return true;
};

/**
 * Creates and displays an alert dialog using bootbox.
 * Useful for showing warning or information messages to the user.
 *
 * @param {string} message - Message to show to the user.
 * @param {HTMLElement} [element] - Element to focus after closing the dialog.
 * @returns {void}
 */
UI.alert = function (message, element) {
    'use strict';
    if (typeof message !== 'string') {
        console.error('UI.alert: A string was expected as message.');
        return;
    }

    const box = bootbox.alert({
        title: '<i class="fas fa-exclamation-circle fa-fw text-danger"></i> A problem occurred',
        message,
        locale: 'en',
        backdrop: true,
    });

    if (element instanceof HTMLElement) {
        box.on('hidden.bs.modal', function () {
            element.focus();
        });
    }
};

/**
 * Creates a confirmation dialog using bootbox.
 * Useful for requesting user confirmation before performing an action, such as
 * submitting a form.
 *
 * @param {HTMLElement} element - Element (form or a) that is being confirmed.
 * @param {string} [message] - Message to show to the user.
 * Default is 'Are you sure you want to perform this action?'.
 * @param {string} [loading] - Loading message to show during the operation, if
 * provided.
 * @returns {boolean} Always returns false to prevent the default action in
 * forms.
 */
UI.confirm = function (element, message, loading) {
    'use strict';
    if (!(element instanceof HTMLElement)) {
        console.error(
            'UI.confirm: The provided element is not a valid HTML element.',
        );
        return false;
    }
    if (message === undefined) {
        message = 'Are you sure you want to perform this action?';
    }
    if (typeof message !== 'string') {
        console.error(
            'UI.confirm: The provided message is not a valid string.',
        );
        return false;
    }

    bootbox.confirm({
        title: '<i class="fas fa-question-circle fa-fw text-warning"></i> Confirmation required',
        message,
        locale: 'es',
        backdrop: true,
        buttons: {
            confirm: {
                className: 'btn-success',
            },
            cancel: {
                className: 'btn-danger',
            },
        },
        callback(result) {
            if (result) {
                if (loading && typeof loading === 'string') {
                    UI.loading(loading);
                }
                if (element.tagName.toUpperCase() === 'FORM') {
                    element.removeAttribute('onsubmit');
                    if (typeof element.submit === 'function') {
                        element.submit();
                    } else if (
                        element.submit &&
                        typeof element.submit.click !== 'undefined'
                    ) {
                        element.submit.click();
                    } else {
                        console.error(
                            'UI.confirm: It was not possible to perform the action on the form.',
                        );
                    }
                } else if (element.tagName.toUpperCase() === 'A') {
                    window.location = element.href;
                }
            }
        },
    });

    return false;
};

/**
 * Smoothly scrolls the page to the specified element.
 *
 * @param {string|HTMLElement} element - Element or ID of the element to scroll
 * to.
 * @param {number} [header_offset] - Offset to adjust the scroll position.
 * Default is 100.
 * @returns {void}
 */
UI.scroll = function (element, header_offset) {
    'use strict';
    if (header_offset === undefined) {
        header_offset = 100;
    }
    if (typeof element === 'string') {
        element = document.getElementById(element);
    }
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - header_offset;
    setTimeout(() => {
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    }, 300);
};

/**
 * Updates the browser URL without reloading, adding an anchor link. Uses the
 * `_base` and `_request` variables to construct the URL. If they are not
 * defined, `_base` is defined as the current URL without the hash, and
 * `_request` is left empty.
 *
 * @param {string} link - Anchor to add to the current URL.
 * @returns {void}
 */
UI.deeplink = function (link) {
    'use strict';

    const _base =
        typeof window._base !== 'undefined'
            ? window._base
            : location.href.split('#')[0];
    const _request = window._request || '';
    const url = `${_base}${_request}#${link}`;
    history.replaceState(null, null, url);
};

/**
 * Prints a specific element of the page.
 *
 * @param {string} element_id - The ID of the element to be printed.
 * @returns {void}
 */
UI.print = function (element_id) {
    // Creates a temporary iframe in the document.
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    // Gets the content of the element you want to print.
    const contenido = document.getElementById(element_id).innerHTML;

    // Writes the content to the iframe document.
    // You can also include the necessary styles here.
    iframe.contentDocument.write('<html><head><title>Print</title>');
    const links = document.getElementsByTagName('link');
    for (let i = 0; i < links.length; i++) {
        const link = links[i];
        if (link.rel === 'stylesheet') {
            iframe.contentDocument.write(
                `<link rel="stylesheet" href="${link.href}" type="text/css" />`,
            );
        }
    }
    iframe.contentDocument.write('</head><body>');
    iframe.contentDocument.write(contenido);
    iframe.contentDocument.write('</body></html>');
    iframe.contentDocument.close();

    // Wait for the iframe to load completely before printing.
    iframe.onload = function () {
        // Call the print method of the iframe.
        iframe.contentWindow.print();

        // Optional: Remove the iframe after printing.
        setTimeout(function () {
            document.body.removeChild(iframe);
        }, 1000); // Adjust the time as necessary.
    };
};

// Export module for use in node.js.
if (typeof module === 'object' && module.exports) {
    module.exports = UI;
}
