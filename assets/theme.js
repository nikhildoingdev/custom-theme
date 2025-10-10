// Helper function to format into local currency
function formatMoney(cents, currency = 'USD', locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(cents / 100);
}

