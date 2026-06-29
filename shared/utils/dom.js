/**
 * Shared DOM Manipulation Utilities
 * Reduces repetitive document.getElementById and innerHTML patterns
 * found across Pertemuan_11, Pertemuan_13, Pertemuan_14, and Pertemuan_19.
 */

/**
 * Get a DOM element by its ID.
 * @param {string} id - Element ID
 * @returns {HTMLElement|null}
 */
function getElement(id) {
    return document.getElementById(id);
}

/**
 * Get the trimmed value of an input element by ID.
 * @param {string} id - Input element ID
 * @returns {string}
 */
function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
}

/**
 * Get the numeric value of an input element by ID.
 * @param {string} id - Input element ID
 * @returns {number} Parsed float value (NaN if invalid)
 */
function getNumericValue(id) {
    return parseFloat(document.getElementById(id).value);
}

/**
 * Set the text content of an element.
 * @param {string} id - Element ID
 * @param {string} text - Text to set
 */
function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

/**
 * Set the innerHTML of an element.
 * @param {string} id - Element ID
 * @param {string} html - HTML string to set
 */
function setHTML(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
}

/**
 * Show an element by setting display to 'block' (or a custom value).
 * @param {string} id - Element ID
 * @param {string} [displayType='block'] - CSS display value
 */
function showElement(id, displayType = 'block') {
    const el = document.getElementById(id);
    if (el) el.style.display = displayType;
}

/**
 * Hide an element by setting display to 'none'.
 * @param {string} id - Element ID
 */
function hideElement(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
}

/**
 * Add one or more CSS classes to an element.
 * @param {string} id - Element ID
 * @param {...string} classNames - Class names to add
 */
function addClass(id, ...classNames) {
    const el = document.getElementById(id);
    if (el) el.classList.add(...classNames);
}

/**
 * Remove one or more CSS classes from an element.
 * @param {string} id - Element ID
 * @param {...string} classNames - Class names to remove
 */
function removeClass(id, ...classNames) {
    const el = document.getElementById(id);
    if (el) el.classList.remove(...classNames);
}

/**
 * Set the value of an input element by ID.
 * @param {string} id - Input element ID
 * @param {string} value - Value to set
 */
function setInputValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value;
}

/**
 * Focus an input element by ID.
 * @param {string} id - Element ID
 */
function focusElement(id) {
    const el = document.getElementById(id);
    if (el) el.focus();
}
