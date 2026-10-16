/** Number formatting shared by exchange cards and the calculator (en-US digits in every language). */
export const formatPct = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 2 });

export const formatUsd = (n: number) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: n < 100 ? 2 : 0, maximumFractionDigits: 2 })}`;
