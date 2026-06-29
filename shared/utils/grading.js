/**
 * Shared Grade/Score Evaluation Utilities
 * Consolidates repeated grading logic from:
 * - Pertemuan_11/apliaksi_sederhana_js.html (pass/fail with KKM)
 * - Pertemuan_13/js_pemilihan.html (if-else grade thresholds)
 * - Pertemuan_13/js_switchcase.html (switch-case grade thresholds)
 */

/**
 * Calculate a weighted final score from multiple components.
 * @param {Array<{score: number, weight: number}>} components - Score components with weights
 * @returns {number} Weighted total
 *
 * Example:
 *   calculateWeightedScore([
 *     { score: 80, weight: 0.4 },
 *     { score: 90, weight: 0.6 }
 *   ]) // returns 86
 */
function calculateWeightedScore(components) {
    return components.reduce(function(total, component) {
        return total + (component.score * component.weight);
    }, 0);
}

/**
 * Evaluate pass/fail status based on a minimum passing grade (KKM).
 * @param {number} score - The score to evaluate
 * @param {number} [kkm=70] - Minimum passing grade (default: 70)
 * @returns {{ passed: boolean, status: string }}
 */
function evaluatePassFail(score, kkm) {
    if (kkm === undefined) kkm = 70;
    return {
        passed: score >= kkm,
        status: score >= kkm ? 'LULUS' : 'TIDAK LULUS'
    };
}

/**
 * Determine letter grade based on numeric score using standard thresholds.
 * @param {number} score - Numeric score (0-100)
 * @returns {{ grade: string, description: string }}
 *
 * Thresholds:
 *   >= 90 => A (Sangat Memuaskan)
 *   >= 80 => B (Memuaskan)
 *   >= 70 => C (Cukup)
 *   >= 60 => D (Kurang)
 *   <  60 => E (Sangat Kurang)
 */
function getLetterGrade(score) {
    if (score >= 90) return { grade: 'A', description: 'Sangat Memuaskan' };
    if (score >= 80) return { grade: 'B', description: 'Memuaskan' };
    if (score >= 70) return { grade: 'C', description: 'Cukup' };
    if (score >= 60) return { grade: 'D', description: 'Kurang' };
    return { grade: 'E', description: 'Sangat Kurang' };
}

/**
 * Calculate discount based on member status and purchase total.
 * Extracted from Pertemuan_14/pemilihan_if_else&switch_case_kompeks.html
 * @param {number} totalBelanja - Total purchase amount
 * @param {string} statusMember - Member status (Platinum, Gold, Silver, etc.)
 * @returns {number} Discount percentage (0 to 1)
 */
function calculateMemberDiscount(totalBelanja, statusMember) {
    if (statusMember === 'Platinum' && totalBelanja >= 500000) return 0.20;
    if (statusMember === 'Gold' || totalBelanja >= 300000) return 0.10;
    if (statusMember === 'Silver' && totalBelanja >= 150000) return 0.05;
    return 0;
}
