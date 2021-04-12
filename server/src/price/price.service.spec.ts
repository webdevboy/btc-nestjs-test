import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IPrice } from './interfaces/price';
import { PriceModule } from './price.module';
import { PriceService } from './price.service';

describe('PriceService', () => {
  let service: PriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriceService],
      imports: [HttpModule],
    }).compile();

    service = module.get<PriceService>(PriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return price object', async () => {
    const result = {
      assetId: 'BTC',
      value: '123.2',
    };
    jest.spyOn(service, 'getPrice').mockImplementation(() => new Promise((resolve, reject) => {resolve(result)}));
    expect(await service.getPrice('BTC')).toEqual(result);
  })
});
