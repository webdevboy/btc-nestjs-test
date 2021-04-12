import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PriceController } from './price.controller';
import { PriceService } from './price.service';

describe('PriceController', () => {
  let controller: PriceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriceController],
      providers: [PriceService],
      imports: [HttpModule],
    }).compile();

    controller = module.get<PriceController>(PriceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return price object', async () => {
    const result = {
      assetId: 'BTC',
      value: '123.2',
    };
    jest.spyOn(controller, 'getPrice').mockImplementation(() => new Promise((resolve, reject) => {resolve(result)}));
    expect(await controller.getPrice('BTC')).toEqual(result);
  })
});
