/*! Form functions | (c) 2025 Derafu DEV | MIT */

// Import all form modules.
// Note: In a browser environment, these modules should be loaded before this
// file. The modules are: FormValidation, FormFields, FormTables.

// Main object where all form functions will be assigned for backward
// compatibility.
const Form = {};

// Import FormValidation functions.
if (typeof FormValidation !== 'undefined') {
    Form.loading = FormValidation.loading;
    Form.alert = FormValidation.alert;
    Form.confirm = FormValidation.confirm;
    Form.check = FormValidation.check;
    Form.check_notempty = FormValidation.check_notempty;
    Form.check_real = FormValidation.check_real;
    Form.check_email = FormValidation.check_email;
    Form.check_rut = FormValidation.check_rut;
    Form.getFieldLabel = FormValidation.getFieldLabel;
}

// Import FormFields functions.
if (typeof FormFields !== 'undefined') {
    Form.post = FormFields.post;
    Form.showPassword = FormFields.showPassword;
    Form.growup = FormFields.growup;
    Form.fixFields = FormFields.fixFields;
    Form.checkboxesSet = FormFields.checkboxesSet;
    Form.removeOptions = FormFields.removeOptions;
    Form.addOptions = FormFields.addOptions;
}

// Import FormTables functions.
if (typeof FormTables !== 'undefined') {
    Form.addJS = FormTables.addJS;
    Form.delJS = FormTables.delJS;
    Form.updateTablecheck = FormTables.updateTablecheck;
}

// Export module for use in Node.js.
if (typeof module === 'object' && module.exports) {
    module.exports = Form;
}
