import axios from 'axios';
import { DEV_SERVER, PROD_SERVER } from 'config';
import { IPriceParams } from './interfaces';

const BASE_URL = process.env.NODE_ENV === 'development' ? DEV_SERVER : PROD_SERVER;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
});

export const getPrice = (params: IPriceParams): any => api.get('/price', { params });
