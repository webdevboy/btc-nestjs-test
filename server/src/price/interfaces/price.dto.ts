export interface PriceCurrentPriceDTO {
  usd: number,
}

export interface PriceMarketDataDTO {
  current_price: PriceCurrentPriceDTO,
}

export interface PriceDataDTO {
  id: string,
  market_data: PriceMarketDataDTO,
}

export interface PriceDTO {
  data: PriceDataDTO,
}
