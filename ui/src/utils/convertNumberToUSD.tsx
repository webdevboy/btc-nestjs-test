const convertNumberToUSD = (value: number): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 5 }).format(value);
};

export default convertNumberToUSD;
