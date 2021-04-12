import { Controller, Get, Query } from '@nestjs/common';
import { PriceService } from './price.service';

@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}  

  @Get()
  async getPrice(@Query('asset') asset: string): Promise<number> {
    const data = await this.priceService.getPrice(asset);
    return data;
  }
}
