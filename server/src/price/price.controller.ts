import { Controller, Get, Query } from '@nestjs/common';
import { IPrice } from './interfaces/price';
import { PriceService } from './price.service';

@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}  

  @Get()
  async getPrice(@Query('asset') asset: string): Promise<IPrice> {
    const data = await this.priceService.getPrice(asset);
    return data;
  }
}
