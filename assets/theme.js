// Helper function to format into local currency
function formatMoney(cents, currency = 'USD', locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(cents / 100);
}

// Helper function to debounce search
function debounce(func, delay) {
  let timeoutID;
  return function (...args) {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

