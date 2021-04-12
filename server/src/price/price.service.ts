import { Injectable, HttpService, HttpStatus, HttpException } from '@nestjs/common';
import { ASSET_NOT_EMPTY, ASSET_NOT_SUPPORTED } from '../config/messages';
import { CoinDTO } from './interfaces/coin.dto';
import { IPrice } from './interfaces/price';

@Injectable()
export class PriceService {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  async getPrice(asset: string): Promise<IPrice> {
    const res: CoinDTO = await this.httpService.get(this.buildUrl(asset)).toPromise();
    const value = res.data?.market_data?.current_price?.usd;
    const price: IPrice = {
      assetId: res.data.id,
      // Converting to string and leave only 1 floating point
      value: value ? value.toFixed(1) : '',
    }
    return price;
  }

  private buildUrl(asset: string): string {
    const URL_BASE = 'https://api.coingecko.com/api/v3/coins';
    if(!asset) {
      throw new HttpException(ASSET_NOT_EMPTY, HttpStatus.BAD_REQUEST);
    }
    switch(asset) {
      case 'BTC': {
        return `${URL_BASE}/bitcoin`;
      }
      case 'ETH': {
        return `${URL_BASE}/ethereum`;
      }
      default: {
        throw new HttpException(ASSET_NOT_SUPPORTED, HttpStatus.BAD_REQUEST);
      }
    }
  }
}
