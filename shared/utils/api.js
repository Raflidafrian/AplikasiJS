/**
 * Shared Fetch API Wrapper Utilities
 * Consolidates repeated fetch patterns from:
 * - Pertemuan_16/db_mahasiswa_05tple005/script.js (loadData, hapusData, simpanData)
 */

/**
 * Perform a GET request and return parsed JSON.
 * @param {string} url - The endpoint URL
 * @returns {Promise<*>} Parsed JSON response
 */
function fetchJSON(url) {
    return fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('HTTP error ' + response.status);
            }
            return response.json();
        });
}

/**
 * Perform a POST request with FormData and return parsed JSON.
 * @param {string} url - The endpoint URL
 * @param {FormData|Object} data - FormData object or plain object to send
 * @returns {Promise<*>} Parsed JSON response
 */
function postFormData(url, data) {
    var formData;
    if (data instanceof FormData) {
        formData = data;
    } else {
        formData = new FormData();
        Object.keys(data).forEach(function(key) {
            formData.append(key, data[key]);
        });
    }

    return fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
        }
        return response.json();
    });
}

/**
 * Perform a POST request with JSON body and return parsed JSON.
 * @param {string} url - The endpoint URL
 * @param {Object} data - Data object to send as JSON
 * @returns {Promise<*>} Parsed JSON response
 */
function postJSON(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
        }
        return response.json();
    });
}

/**
 * Generic CRUD helper that performs a fetch, checks status, and calls appropriate callbacks.
 * Extracted from the repeated pattern in script.js (loadData, hapusData, simpanData).
 * @param {string} url - The endpoint URL
 * @param {Object} [options] - Fetch options
 * @param {Function} onSuccess - Called with response data on success
 * @param {Function} [onError] - Called with error message on failure
 */
function apiRequest(url, options, onSuccess, onError) {
    fetch(url, options || {})
        .then(function(response) { return response.json(); })
        .then(function(data) {
            if (data.status === 'success' || Array.isArray(data)) {
                onSuccess(data);
            } else {
                var errMsg = data.message || 'Terjadi kesalahan';
                if (onError) {
                    onError(errMsg);
                } else {
                    alert('Gagal: ' + errMsg);
                }
            }
        })
        .catch(function(error) {
            console.error('API Error:', error);
            if (onError) onError(error.message);
        });
}

/**
 * Confirm-then-delete pattern used across the CRUD app.
 * @param {string} url - Delete endpoint URL
 * @param {Object} params - Parameters to send (e.g., { id, table })
 * @param {Function} onSuccess - Callback on success
 * @param {string} [confirmMsg] - Confirmation message
 */
function confirmDelete(url, params, onSuccess, confirmMsg) {
    var message = confirmMsg || 'Yakin ingin menghapus data ini?';
    if (confirm(message)) {
        postFormData(url, params).then(function(data) {
            if (data.status === 'success') {
                onSuccess(data);
            } else {
                alert('Gagal: ' + (data.message || 'Terjadi kesalahan'));
            }
        }).catch(function(error) {
            console.error('Delete Error:', error);
        });
    }
}
