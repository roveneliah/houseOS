export const toPercent = (num: number): string =>
  isNaN(num) || isNaN(num / Infinity) ? "0%" : (num * 100).toFixed(0) + "%";
