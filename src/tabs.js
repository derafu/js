/*! Tabs functions | (c) 2025 Derafu DEV | MIT */

// Object where tabs functions will be assigned.
const Tabs = {};

/**
 * [DEPRECATED] Initializes tabs and manages navigation and display based on URL.
 * Opens the first tab by default and the tab specified in the URL, if it exists.
 * Adds magic links and updates the URL when changing tabs.
 *
 * @deprecated This function is deprecated and will be removed in future versions.
 * Use Tabs.init() instead.
 * @returns {*} Returns the result of Tabs.init().
 */
Tabs.init_old = function () {
    'use strict';
    console.warn('Tabs.init_old() is deprecated. Use Tabs.init() instead.');
    return Tabs.init();
};

/**
 * Initializes tabs and manages navigation and display based on URL.
 * Opens the first tab by default and the tab specified in the URL, if it exists.
 * Adds magic links and updates the URL when changing tabs.
 *
 * @returns {void}
 */
Tabs.init = function () {
    'use strict';

    // Open the first tab by default.
    const firstTabLink = document.querySelector('.nav-tabs a');
    if (firstTabLink) {
        new bootstrap.Tab(firstTabLink).show();
    }

    // Handle opening tabs based on URL.
    Tabs.handleURLDeeplink();

    // Update URL when clicking on each tab.
    const tabLinks = document.querySelectorAll('a[data-bs-toggle="tab"]');
    tabLinks.forEach(tabLink => {
        tabLink.addEventListener('click', function () {
            Tabs.deeplink(tabLink.getAttribute('aria-controls'));
        });
    });

    // Add magic links, modal button actions, and form elements within tabs.
    for (const tabPane of document.querySelectorAll('div.tab-pane')) {
        if (tabPane.id) {
            Tabs.addLinksToTabCards(tabPane);
            Tabs.bindModalButtons(tabPane);
            Tabs.bindFormElements(tabPane);
        }
    }

    // Check if there are open modals after closing the current one.
    // If there are no more open modals, manually remove the backdrop.
    // This is useful if you have some process that opens multiple modals
    // and modal-backdrop elements are left by error without being removed by
    // Bootstrap.
    /*document.addEventListener('hidden.bs.modal', function(event) {
        if (!document.querySelector('.modal.show')) {
            const backdrops = document.querySelectorAll('.modal-backdrop');
            backdrops.forEach((backdrop) => {
                backdrop.remove();
            });
        }
    }, true);*/
};

/**
 * Handles opening tabs and focusing on specific elements based on URL.
 * @returns {void}
 */
Tabs.handleURLDeeplink = function () {
    'use strict';
    const url = document.location.toString();
    if (url.match('#')) {
        const deeplink = url.split('#')[1];
        if (deeplink !== '') {
            const [tabId, elementId] = deeplink.split(':');
            const tabElement = document.getElementById(`${tabId}-tab`);
            if (tabElement) {
                new bootstrap.Tab(tabElement).show();
                Tabs.handleTabDeeplink(tabElement, elementId);
            }
        }
    }
};

/**
 * Focuses on a specific element within a tab.
 *
 * @param {HTMLElement} tabElement - Tab element that has been activated.
 * @param {string} elementId - ID of the specific element within the tab to
 * focus on.
 * @returns {void}
 */
Tabs.handleTabDeeplink = function (tabElement, elementId) {
    'use strict';

    // If the elementId is part of a card ID, scroll to the card.
    const tabElement_id = tabElement.id.replace('-tab', '');
    const cardElement = document.getElementById(
        `${tabElement_id}_${elementId}-card`,
    );
    if (cardElement) {
        cardElement.classList.add('deeplink', 'border', 'border-danger');
        typeof UI !== 'undefined'
            ? UI.scroll(cardElement)
            : cardElement.scrollIntoView({ behavior: 'smooth' });
        return;
    }

    // If the elementId exists on its own, handle according to its type.
    const element = document.getElementById(elementId);
    if (element) {
        // If it's a modal, open it.
        if (element.classList.contains('modal')) {
            let modalInstance = bootstrap.Modal.getInstance(element);
            if (!modalInstance) {
                modalInstance = new bootstrap.Modal(element);
            }
            modalInstance.show();
        }
        // If it's a select (including select2), apply border and scroll.
        else if (
            element.tagName.toLowerCase() === 'select' &&
            element.dataset.select2Id
        ) {
            element.parentElement
                .querySelector('span.select2-selection')
                .classList.add('deeplink', 'border', 'border-danger');
            typeof UI !== 'undefined'
                ? UI.scroll(element)
                : element.scrollIntoView({ behavior: 'smooth' });
        }
        // If it's not a modal or select2, apply border and scroll.
        else {
            element.classList.add('deeplink', 'border', 'border-danger');
            typeof UI !== 'undefined'
                ? UI.scroll(element)
                : element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    // If it's not a card or specific ID, scroll to the tab.
    else {
        typeof UI !== 'undefined'
            ? UI.scroll(tabElement)
            : tabElement.scrollIntoView({ behavior: 'smooth' });
    }
};

/**
 * Adds magic links to cards within each tab pane.
 *
 * @param {HTMLElement} tabPane - The tab panel where links will be added.
 * @returns {void}
 */
Tabs.addLinksToTabCards = function (tabPane) {
    'use strict';
    for (const card of tabPane.querySelectorAll('div.card')) {
        const cardId = card.id;
        if (
            cardId &&
            cardId.startsWith(`${tabPane.id}_`) &&
            cardId.endsWith('-card')
        ) {
            const header = card.querySelector('div.card-header');
            if (header) {
                const link = document.createElement('a');
                const deeplink = `${tabPane.id}:${cardId.replace(`${tabPane.id}_`, '').replace('-card', '')}`;
                link.href = `#${deeplink}`;
                link.className = 'float-end';
                link.innerHTML = `<i class="fa-solid fa-link fa-fw text-muted" onclick="Tabs.deeplink('${deeplink}'); return false"></i>`;
                header.insertBefore(link, header.firstChild);
            }
        }
    }
};

/**
 * Binds modal actions to buttons within each tab pane.
 *
 * @param {HTMLElement} tabPane - The tab panel where buttons will be bound.
 * @returns {void}
 */
Tabs.bindModalButtons = function (tabPane) {
    'use strict';
    for (const button of tabPane.querySelectorAll(
        'button[data-bs-toggle="modal"]',
    )) {
        button.setAttribute(
            'onclick',
            `Tabs.deeplink('${tabPane.id}:${button.dataset.bsTarget.replace('#', '')}')`,
        );
    }
};

/**
 * Binds click actions to form element labels within each tab pane.
 *
 * @param {HTMLElement} tabPane - The tab panel where buttons will be bound.
 * @returns {void}
 */
Tabs.bindFormElements = function (tabPane) {
    'use strict';
    for (const formElement of tabPane.querySelectorAll(
        'form input, form select, form textarea',
    )) {
        if (formElement.id) {
            const label = tabPane.querySelector(
                `label[for="${formElement.id}"]`,
            );
            if (label) {
                label.setAttribute(
                    'onclick',
                    `Tabs.deeplink('${tabPane.id}:${formElement.id}')`,
                );
            }
        }
    }
};

/**
 * Updates the browser URL and handles the display of tabs and elements based on
 * the provided deeplink. This function is responsible for updating the URL
 * without reloading the page, cleaning previously marked elements with borders
 * (if any), and calling the handleURLDeeplink function to handle the specific
 * URL logic.
 *
 * @param {string} deeplink - The deeplink that represents the tab and/or the
 * specific element to focus on. The expected format is 'tabId' or
 * 'tabId:elementId'.
 * @returns {void}
 */
Tabs.deeplink = function (deeplink) {
    // Assign deeplink to URL.
    typeof UI !== 'undefined'
        ? UI.deeplink(deeplink)
        : (() => {
              const _base =
                  typeof window._base !== 'undefined'
                      ? window._base
                      : location.href.split('#')[0];
              const _request = window._request || '';
              const url = `${_base}${_request}#${deeplink}`;
              history.replaceState(null, null, url);
          })();

    // Clean the deeplink selection class in case they exist.
    // This ensures that only one "marked" element exists at the same time.
    for (const element of document.querySelectorAll(
        '.deeplink.border.border-danger',
    )) {
        element.classList.remove('deeplink', 'border', 'border-danger');
    }

    // Handle opening tabs based on URL.
    Tabs.handleURLDeeplink();
};

// Export module for use in Node.js.
if (typeof module === 'object' && module.exports) {
    module.exports = Tabs;
}
