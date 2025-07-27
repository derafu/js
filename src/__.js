/*! Generic functions | (c) 2025 Derafu DEV | MIT */

// Import all modules.
// Note: In a browser environment, these modules should be loaded before this
// file. The modules are: Utils, UI, Validation, Tabs, FormValidation,
// FormFields, FormTables.

// Main object where all functions will be assigned for backward compatibility.
const __ = {};

// Import Utils functions.
if (typeof Utils !== 'undefined') {
    __.generatePassword = Utils.generatePassword;
    __.getCookie = Utils.getCookie;
    __.getUserLanguage = Utils.getUserLanguage;
    __.num = Utils.num;
    __.empty = Utils.empty;
    __.isInt = Utils.isInt;
    __.isFloat = Utils.isFloat;
    __.keyValues = Utils.keyValues;
    __.selector = Utils.selector;
} else if (typeof module === 'object' && module.exports) {
    // Node.js environment - import modules directly.
    try {
        const Utils = require('./utils.js');
        __.generatePassword = Utils.generatePassword;
        __.getCookie = Utils.getCookie;
        __.getUserLanguage = Utils.getUserLanguage;
        __.num = Utils.num;
        __.empty = Utils.empty;
        __.isInt = Utils.isInt;
        __.isFloat = Utils.isFloat;
        __.keyValues = Utils.keyValues;
        __.selector = Utils.selector;
    } catch (e) {
        // Module not found, continue
    }
}

// Import UI functions.
if (typeof UI !== 'undefined') {
    __.popup = UI.popup;
    __.table = UI.table;
    __.notify = UI.notify;
    __.copy = UI.copy;
    __.paste = UI.paste;
    __.share = UI.share;
    __.loading = UI.loading;
    __.alert = UI.alert;
    __.confirm = UI.confirm;
    __.scroll = UI.scroll;
    __.deeplink = UI.deeplink;
    __.print = UI.print;
} else if (typeof module === 'object' && module.exports) {
    // Node.js environment - import modules directly.
    try {
        const UI = require('./ui.js');
        __.popup = UI.popup;
        __.table = UI.table;
        __.notify = UI.notify;
        __.copy = UI.copy;
        __.paste = UI.paste;
        __.share = UI.share;
        __.loading = UI.loading;
        __.alert = UI.alert;
        __.confirm = UI.confirm;
        __.scroll = UI.scroll;
        __.deeplink = UI.deeplink;
        __.print = UI.print;
    } catch (e) {
        // Module not found, continue
    }
}

// Import Validation functions.
if (typeof ValidationL10nCl !== 'undefined') {
    __.rut = ValidationL10nCl.rut;
} else if (typeof module === 'object' && module.exports) {
    // Node.js environment - import modules directly.
    try {
        const ValidationL10nCl = require('./validation/l10n-cl.js');
        __.rut = ValidationL10nCl.rut;
    } catch (e) {
        // Module not found, continue.
    }
}

// Import Tabs functions.
if (typeof Tabs !== 'undefined') {
    __.tabs = Tabs.init;
    __.tabs_init = Tabs.init_old; // For backward compatibility.
    // Add all tabs methods to the main object.
    __.tabs.handleURLDeeplink = Tabs.handleURLDeeplink;
    __.tabs.handleTabDeeplink = Tabs.handleTabDeeplink;
    __.tabs.addLinksToTabCards = Tabs.addLinksToTabCards;
    __.tabs.bindModalButtons = Tabs.bindModalButtons;
    __.tabs.bindFormElements = Tabs.bindFormElements;
    __.tabs.deeplink = Tabs.deeplink;
} else if (typeof module === 'object' && module.exports) {
    // Node.js environment - import modules directly.
    try {
        const Tabs = require('./tabs.js');
        __.tabs = Tabs.init;
        __.tabs_init = Tabs.init_old; // For backward compatibility.
        // Add all tabs methods to the main object.
        __.tabs.handleURLDeeplink = Tabs.handleURLDeeplink;
        __.tabs.handleTabDeeplink = Tabs.handleTabDeeplink;
        __.tabs.addLinksToTabCards = Tabs.addLinksToTabCards;
        __.tabs.bindModalButtons = Tabs.bindModalButtons;
        __.tabs.bindFormElements = Tabs.bindFormElements;
        __.tabs.deeplink = Tabs.deeplink;
    } catch (e) {
        // Module not found, continue.
    }
}

// Import Form functions (for backward compatibility).
if (typeof FormValidation !== 'undefined') {
    __.Form = {};
    __.Form.loading = FormValidation.loading;
    __.Form.alert = FormValidation.alert;
    __.Form.confirm = FormValidation.confirm;
    __.Form.check = FormValidation.check;
    __.Form.check_notempty = FormValidation.check_notempty;
    __.Form.check_real = FormValidation.check_real;
    __.Form.check_email = FormValidation.check_email;
    __.Form.check_rut = FormValidation.check_rut;
    __.Form.getFieldLabel = FormValidation.getFieldLabel;
} else if (typeof module === 'object' && module.exports) {
    // Node.js environment - import modules directly.
    try {
        const FormValidation = require('./form/validation.js');
        __.Form = {};
        __.Form.loading = FormValidation.loading;
        __.Form.alert = FormValidation.alert;
        __.Form.confirm = FormValidation.confirm;
        __.Form.check = FormValidation.check;
        __.Form.check_notempty = FormValidation.check_notempty;
        __.Form.check_real = FormValidation.check_real;
        __.Form.check_email = FormValidation.check_email;
        __.Form.check_rut = FormValidation.check_rut;
        __.Form.getFieldLabel = FormValidation.getFieldLabel;
    } catch (e) {
        // Module not found, continue.
    }
}

if (typeof FormFields !== 'undefined') {
    if (!__.Form) {
        __.Form = {};
    }
    __.Form.post = FormFields.post;
    __.Form.showPassword = FormFields.showPassword;
    __.Form.growup = FormFields.growup;
    __.Form.fixFields = FormFields.fixFields;
    __.Form.checkboxesSet = FormFields.checkboxesSet;
    __.Form.removeOptions = FormFields.removeOptions;
    __.Form.addOptions = FormFields.addOptions;
} else if (typeof module === 'object' && module.exports) {
    // Node.js environment - import modules directly.
    try {
        const FormFields = require('./form/fields.js');
        if (!__.Form) {
            __.Form = {};
        }
        __.Form.post = FormFields.post;
        __.Form.showPassword = FormFields.showPassword;
        __.Form.growup = FormFields.growup;
        __.Form.fixFields = FormFields.fixFields;
        __.Form.checkboxesSet = FormFields.checkboxesSet;
        __.Form.removeOptions = FormFields.removeOptions;
        __.Form.addOptions = FormFields.addOptions;
    } catch (e) {
        // Module not found, continue.
    }
}

if (typeof FormTables !== 'undefined') {
    if (!__.Form) {
        __.Form = {};
    }
    __.Form.addJS = FormTables.addJS;
    __.Form.delJS = FormTables.delJS;
    __.Form.updateTablecheck = FormTables.updateTablecheck;
} else if (typeof module === 'object' && module.exports) {
    // Node.js environment - import modules directly.
    try {
        const FormTables = require('./form/tables.js');
        if (!__.Form) {
            __.Form = {};
        }
        __.Form.addJS = FormTables.addJS;
        __.Form.delJS = FormTables.delJS;
        __.Form.updateTablecheck = FormTables.updateTablecheck;
    } catch (e) {
        // Module not found, continue.
    }
}

// Export module for use in node.js.
if (typeof module === 'object' && module.exports) {
    module.exports = __;
}
