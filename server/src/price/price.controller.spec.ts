import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IPrice } from './interfaces/price';
import { PriceController } from './price.controller';
import { PriceService } from './price.service';

describe('PriceController', () => {
  let controller: PriceController;
  const result: IPrice = {
    assetId: 'BTC',
    value: '',
  };
  let testResult: IPrice;
  const oneNumAfterDecimalRegex: RegExp = new RegExp(/^-?[0-9]*\.\d$/gm);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriceController],
      providers: [PriceService],
      imports: [HttpModule],
    }).compile();

    controller = module.get<PriceController>(PriceController);
    jest.spyOn(controller, 'getPrice').mockImplementation(() => new Promise((resolve, reject) => {resolve(result)}));
    testResult = await controller.getPrice('BTC');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return price object', async () => {
    expect(testResult).toEqual(result);    
  })
  it('should not be empty', () => {
    expect(testResult.value).toBeTruthy();
  });
  it('should be string', () => {
    expect(typeof testResult.value).toBe('string');
  });
  it('should have only 1 number after point', () => {
    expect(oneNumAfterDecimalRegex.test(testResult.value)).toBe(true);
  });
});
