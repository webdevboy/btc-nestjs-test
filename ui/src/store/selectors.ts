export const getPriceValue = (state: PriceState): number => state.price; 
export const getLoading = (state: PriceState): boolean => state.loading;
export const getError = (state: PriceState): string => state.error;
