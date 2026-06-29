/**
 * Shared Form Validation Utilities
 * Consolidates repeated validation logic from:
 * - Pertemuan_11/apliaksi_sederhana_js.html (isNaN checks)
 * - Pertemuan_13/js_form_function.html (empty string checks)
 * - Pertemuan_14/Input_Data_Mahasiswa_array.html (required field validation)
 */

/**
 * Check if a value is empty (null, undefined, or empty string after trim).
 * @param {*} value - Value to check
 * @returns {boolean}
 */
function isEmpty(value) {
    return value === null || value === undefined || String(value).trim() === '';
}

/**
 * Check if a value is a valid number (not NaN after parseFloat).
 * @param {*} value - Value to check
 * @returns {boolean}
 */
function isValidNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

/**
 * Check if a string is a valid email format.
 * @param {string} email - Email string to validate
 * @returns {boolean}
 */
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

/**
 * Validate that all required fields (by ID) have non-empty values.
 * @param {string[]} fieldIds - Array of element IDs to check
 * @returns {{ valid: boolean, emptyFields: string[] }}
 */
function validateRequired(fieldIds) {
    const emptyFields = [];
    fieldIds.forEach(function(id) {
        const el = document.getElementById(id);
        if (!el || isEmpty(el.value)) {
            emptyFields.push(id);
        }
    });
    return {
        valid: emptyFields.length === 0,
        emptyFields: emptyFields
    };
}

/**
 * Validate that a numeric input is within a specified range.
 * @param {number} value - The numeric value
 * @param {number} min - Minimum allowed value
 * @param {number} max - Maximum allowed value
 * @returns {boolean}
 */
function isInRange(value, min, max) {
    return isValidNumber(value) && value >= min && value <= max;
}

/**
 * Show a validation error message using alert (common pattern in this codebase).
 * @param {string} message - Error message to display
 */
function showValidationError(message) {
    alert(message);
}
