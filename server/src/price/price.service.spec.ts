import { HttpModule, HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IPrice } from './interfaces/price';
import { ASSET_NOT_EMPTY, ASSET_NOT_SUPPORTED } from '../config/messages';
import { PriceService } from './price.service';
import { CoinDTO } from './interfaces/coin.dto';

describe('PriceService', () => {
  let service: PriceService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PriceService,
        {
          provide: HttpModule,
          useValue: {
            get: jest.fn(),
          }
        }
      ],
      imports: [HttpModule],
    }).compile();

    service = module.get<PriceService>(PriceService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPrice', () => {
    it('should throw and error if asset is empty', () => {
      expect(() => service.getPrice('')).rejects.toThrowError(ASSET_NOT_EMPTY);
    });

    it('should throw and error if asset is not BTC or ETH', () => {
      expect(() => service.getPrice('TEST')).rejects.toThrowError(ASSET_NOT_SUPPORTED);
    });

    it('should return price object', async () => {
      const apiResult: CoinDTO = {
        data: {
          id: 'BTC',
          market_data: {
            current_price: {
              usd: 123.2,
            }
          }
        }
      };
      const expectedResult: IPrice = {
        assetId: 'BTC',
        value: '123.2',
      };

      jest.spyOn(httpService, 'get').mockImplementation(() => ({
        toPromise: () => Promise.resolve(apiResult),
      }) as any);
      
      expect(service.getPrice('BTC')).resolves.toEqual(expectedResult);
    });
  });

});
