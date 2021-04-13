import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PriceModule } from './../src/price/price.module';
import { ASSET_NOT_EMPTY, ASSET_NOT_SUPPORTED } from './../src/config/messages';

describe('PriceController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PriceModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/price (GET)', () => {
    it('should return success asset', () => {
      return request(app.getHttpServer())
        .get('/price?asset=BTC')
        .expect(HttpStatus.OK);
    });
    it('should return error asset not supported', () => {
      return request(app.getHttpServer())
        .get('/price?asset=UNKNOWN')
        .expect(HttpStatus.BAD_REQUEST)
        .expect({
          statusCode: HttpStatus.BAD_REQUEST,
          message: ASSET_NOT_SUPPORTED,
        });
    });
    it('should return error asset empty error', () => {
      return request(app.getHttpServer())
        .get('/price?asset=')
        .expect(HttpStatus.BAD_REQUEST)
        .expect({
          statusCode: HttpStatus.BAD_REQUEST,
          message: ASSET_NOT_EMPTY
        });
    });
  })
});
