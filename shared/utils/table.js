/**
 * Shared Table Rendering Utilities
 * Consolidates repeated table CRUD patterns from:
 * - Pertemuan_14/Input_Data_Mahasiswa_array.html (array-based table rendering)
 * - Pertemuan_16/db_mahasiswa_05tple005/script.js (DOM table manipulation)
 */

/**
 * Render an array of data into a table body element.
 * @param {string} tbodyId - The ID of the tbody element
 * @param {Array<Object>} data - Array of data objects
 * @param {string[]} columns - Array of property names to display as columns
 * @param {Object} [options] - Optional configuration
 * @param {string} [options.emptyMessage] - Message when no data
 * @param {boolean} [options.showIndex] - Show row number column
 * @param {Function} [options.actionRenderer] - Function returning action buttons HTML per row
 */
function renderTableData(tbodyId, data, columns, options) {
    var opts = options || {};
    var emptyMessage = opts.emptyMessage || 'Belum ada data.';
    var showIndex = opts.showIndex !== false;
    var actionRenderer = opts.actionRenderer || null;

    var tbody = document.getElementById(tbodyId);
    if (!tbody) return;

    if (data.length === 0) {
        var colSpan = columns.length + (showIndex ? 1 : 0) + (actionRenderer ? 1 : 0);
        tbody.innerHTML = '<tr><td colspan="' + colSpan + '" style="text-align:center;color:#94a3b8;font-style:italic;">' + emptyMessage + '</td></tr>';
        return;
    }

    var html = '';
    data.forEach(function(item, index) {
        html += '<tr>';
        if (showIndex) {
            html += '<td><b>' + (index + 1) + '</b></td>';
        }
        columns.forEach(function(col) {
            html += '<td>' + (item[col] !== undefined ? item[col] : '') + '</td>';
        });
        if (actionRenderer) {
            html += '<td>' + actionRenderer(item, index) + '</td>';
        }
        html += '</tr>';
    });

    tbody.innerHTML = html;
}

/**
 * Add an item to a data array and re-render the table.
 * @param {Array} dataArray - The data array to modify
 * @param {Object} newItem - The new item to add
 * @param {string} tbodyId - The tbody element ID
 * @param {string[]} columns - Column property names
 * @param {Object} [options] - Render options
 */
function addTableRow(dataArray, newItem, tbodyId, columns, options) {
    dataArray.push(newItem);
    renderTableData(tbodyId, dataArray, columns, options);
}

/**
 * Update an item in a data array and re-render the table.
 * @param {Array} dataArray - The data array to modify
 * @param {number} index - Index of the item to update
 * @param {Object} updatedItem - The updated item data
 * @param {string} tbodyId - The tbody element ID
 * @param {string[]} columns - Column property names
 * @param {Object} [options] - Render options
 */
function updateTableRow(dataArray, index, updatedItem, tbodyId, columns, options) {
    if (index >= 0 && index < dataArray.length) {
        dataArray[index] = updatedItem;
        renderTableData(tbodyId, dataArray, columns, options);
    }
}

/**
 * Delete an item from a data array and re-render the table.
 * @param {Array} dataArray - The data array to modify
 * @param {number} index - Index of the item to delete
 * @param {string} tbodyId - The tbody element ID
 * @param {string[]} columns - Column property names
 * @param {Object} [options] - Render options
 */
function deleteTableRow(dataArray, index, tbodyId, columns, options) {
    if (index >= 0 && index < dataArray.length) {
        dataArray.splice(index, 1);
        renderTableData(tbodyId, dataArray, columns, options);
    }
}

/**
 * Collect form field values into an object.
 * @param {Object} fieldMap - Map of { propertyName: elementId }
 * @returns {Object} Collected values
 *
 * Example:
 *   collectFormData({ nim: 'nim', nama: 'nama', jurusan: 'jurusan' })
 *   // returns { nim: '123', nama: 'John', jurusan: 'TI' }
 */
function collectFormData(fieldMap) {
    var result = {};
    Object.keys(fieldMap).forEach(function(key) {
        var el = document.getElementById(fieldMap[key]);
        result[key] = el ? el.value.trim() : '';
    });
    return result;
}
