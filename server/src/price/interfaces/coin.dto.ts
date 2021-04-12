export interface CoinCurrentPriceDTO {
  usd: number,
}

export interface CoinMarketDataDTO {
  current_price: CoinCurrentPriceDTO,
}

export interface CoinDataDTO {
  id: string,
  market_data: CoinMarketDataDTO,
}

export interface CoinDTO {
  data: CoinDataDTO,
}
