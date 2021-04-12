import { Injectable, HttpService, HttpStatus, HttpException } from '@nestjs/common';
import { PriceDTO } from './interfaces/price.dto';

@Injectable()
export class PriceService {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  async getPrice(asset: string): Promise<number> {
    const res: PriceDTO = await this.httpService.get(this.buildUrl(asset)).toPromise();
    const value: number = res.data?.market_data?.current_price?.usd;
    return value;
  }

  private buildUrl(asset: string): string {
    const URL_BASE = 'https://api.coingecko.com/api/v3/coins';
    if(!asset) {
      throw new HttpException('asset should be either BTC or ETH, not empty', HttpStatus.BAD_REQUEST);
    }
    switch(asset) {
      case 'BTC': {
        return `${URL_BASE}/bitcoin`;
      }
      case 'ETH': {
        return `${URL_BASE}/ethereum`;
      }
      default: {
        throw new HttpException('This asset is not supported', HttpStatus.BAD_REQUEST);
      }
    }
  }
}
