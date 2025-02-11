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

export function formatWallet(wallet) {
  return (
    wallet.substring(0, 10) + "....." + wallet.substring(wallet.length - 10)
  );
}

export function handleCopy(text) {
  navigator.clipboard.writeText(text);
}

export function formatDate(isoDate) {
  const date = new Date(isoDate);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
}
