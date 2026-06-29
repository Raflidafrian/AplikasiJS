function appendValue(currentDisplay, value) {
  return currentDisplay + value;
}

function clearDisplay() {
  return '';
}

function deleteLast(currentDisplay) {
  return currentDisplay.slice(0, -1);
}

function calculateResult(expression) {
  try {
    if (expression !== '') {
      return String(eval(expression));
    }
    return expression;
  } catch (error) {
    return 'Error';
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { appendValue, clearDisplay, deleteLast, calculateResult };
}
