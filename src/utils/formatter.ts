export function formatAmount(amount) {
  const options = {
    locale: "en-US",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return new Intl.NumberFormat(options.locale, {
    style: "currency",
    ...options,
  }).format(amount);
}
