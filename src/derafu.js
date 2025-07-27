/*! Derafu JS - Main entry point | (c) 2025 Derafu DEV | MIT */

// Main object where all functions will be assigned.
const derafu = {
    utils: {},
    ui: {},
    validation: {
        l10n: {
            cl: {},
        },
    },
    form: {},
    tabs: {},
};

// Import Utils functions.
if (typeof Utils !== 'undefined') {
    derafu.utils.generatePassword = Utils.generatePassword;
    derafu.utils.getCookie = Utils.getCookie;
    derafu.utils.getUserLanguage = Utils.getUserLanguage;
    derafu.utils.num = Utils.num;
    derafu.utils.empty = Utils.empty;
    derafu.utils.isInt = Utils.isInt;
    derafu.utils.isFloat = Utils.isFloat;
    derafu.utils.keyValues = Utils.keyValues;
    derafu.utils.selector = Utils.selector;
} else if (typeof module === 'object' && module.exports) {
    // Node.js environment - import modules directly.
    try {
        const Utils = require('./utils.js');
        derafu.utils.generatePassword = Utils.generatePassword;
        derafu.utils.getCookie = Utils.getCookie;
        derafu.utils.getUserLanguage = Utils.getUserLanguage;
        derafu.utils.num = Utils.num;
        derafu.utils.empty = Utils.empty;
        derafu.utils.isInt = Utils.isInt;
        derafu.utils.isFloat = Utils.isFloat;
        derafu.utils.keyValues = Utils.keyValues;
        derafu.utils.selector = Utils.selector;
    } catch (e) {
        // Module not found, continue.
    }
}

// Import UI functions.
if (typeof UI !== 'undefined') {
    derafu.ui.popup = UI.popup;
    derafu.ui.table = UI.table;
    derafu.ui.notify = UI.notify;
    derafu.ui.copy = UI.copy;
    derafu.ui.paste = UI.paste;
    derafu.ui.share = UI.share;
    derafu.ui.loading = UI.loading;
    derafu.ui.alert = UI.alert;
    derafu.ui.confirm = UI.confirm;
    derafu.ui.scroll = UI.scroll;
    derafu.ui.deeplink = UI.deeplink;
    derafu.ui.print = UI.print;
} else if (typeof module === 'object' && module.exports) {
    // Node.js environment - import modules directly.
    try {
        const UI = require('./ui.js');
        derafu.ui.popup = UI.popup;
        derafu.ui.table = UI.table;
        derafu.ui.notify = UI.notify;
        derafu.ui.copy = UI.copy;
        derafu.ui.paste = UI.paste;
        derafu.ui.share = UI.share;
        derafu.ui.loading = UI.loading;
        derafu.ui.alert = UI.alert;
        derafu.ui.confirm = UI.confirm;
        derafu.ui.scroll = UI.scroll;
        derafu.ui.deeplink = UI.deeplink;
        derafu.ui.print = UI.print;
    } catch (e) {
        // Module not found, continue.
    }
}

// Import Validation functions.
if (typeof ValidationL10nCl !== 'undefined') {
    derafu.validation.l10n.cl.rut = ValidationL10nCl.rut;
    derafu.validation.l10n.cl.dv = ValidationL10nCl.dv;
} else if (typeof module === 'object' && module.exports) {
    // Node.js environment - import modules directly.
    try {
        const ValidationL10nCl = require('./validation/l10n-cl.js');
        derafu.validation.l10n.cl.rut = ValidationL10nCl.rut;
        derafu.validation.l10n.cl.dv = ValidationL10nCl.dv;
    } catch (e) {
        // Module not found, continue.
    }
}

// Import Tabs functions.
if (typeof Tabs !== 'undefined') {
    derafu.tabs.init = Tabs.init;
    derafu.tabs.init_old = Tabs.init_old; // For backward compatibility.
    // Add all tabs methods to the tabs object.
    derafu.tabs.handleURLDeeplink = Tabs.handleURLDeeplink;
    derafu.tabs.handleTabDeeplink = Tabs.handleTabDeeplink;
    derafu.tabs.addLinksToTabCards = Tabs.addLinksToTabCards;
    derafu.tabs.bindModalButtons = Tabs.bindModalButtons;
    derafu.tabs.bindFormElements = Tabs.bindFormElements;
    derafu.tabs.deeplink = Tabs.deeplink;
} else if (typeof module === 'object' && module.exports) {
    // Node.js environment - import modules directly.
    try {
        const Tabs = require('./tabs.js');
        derafu.tabs.init = Tabs.init;
        derafu.tabs.init_old = Tabs.init_old; // For backward compatibility.
        // Add all tabs methods to the tabs object.
        derafu.tabs.handleURLDeeplink = Tabs.handleURLDeeplink;
        derafu.tabs.handleTabDeeplink = Tabs.handleTabDeeplink;
        derafu.tabs.addLinksToTabCards = Tabs.addLinksToTabCards;
        derafu.tabs.bindModalButtons = Tabs.bindModalButtons;
        derafu.tabs.bindFormElements = Tabs.bindFormElements;
        derafu.tabs.deeplink = Tabs.deeplink;
    } catch (e) {
        // Module not found, continue.
    }
}

// Import Form functions.
if (typeof Form !== 'undefined') {
    derafu.form = Form;
} else if (typeof module === 'object' && module.exports) {
    // Node.js environment - import modules directly.
    try {
        const Form = require('./form.js');
        derafu.form = Form;
    } catch (e) {
        // Module not found, continue.
    }
}

// Export module for use in Node.js.
if (typeof module === 'object' && module.exports) {
    module.exports = derafu;
}
