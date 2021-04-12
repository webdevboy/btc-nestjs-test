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
    if(!asset) {
      throw new HttpException('asset should be either BTC or ETH, not empty', HttpStatus.BAD_REQUEST);
    }
    switch(asset) {
      case 'BTC': {
        return 'https://api.coingecko.com/api/v3/coins/bitcoin';
      }
      case 'ETH': {
        return 'https://api.coingecko.com/api/v3/coins/ethereum';
      }
      default: {
        throw new HttpException('asset should be either BTC or ETH, not empty', HttpStatus.BAD_REQUEST);
      }
    }
  }
}
