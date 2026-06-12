export const getSalePrice = (product) => {
  const mrp = Number(product?.mrp ?? 0);
  const discount = Number(product?.discount ?? 0);
  const rawPrice = mrp - (mrp * discount) / 100;
  return Math.max(0, Math.round(rawPrice));
};

export const getSavings = (product) => {
  const mrp = Number(product?.mrp ?? 0);
  const salePrice = getSalePrice(product);
  return Math.max(0, mrp - salePrice);
};
