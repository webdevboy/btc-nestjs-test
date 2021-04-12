import React, { ChangeEvent, useState } from 'react';
import * as api from 'api';
import { IPriceParams } from 'api/interfaces';
import convertNumberToUSD from 'utils/convertNumberToUSD';
import { AxiosError, AxiosResponse } from 'axios';

import 'api/interceptors';

function App() {

  const [price, setPrice] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const changeSelectOption = (e: ChangeEvent<HTMLSelectElement>): void => {
    const params: IPriceParams = {
      asset: e.target.value,
    };
    setLoading(true);
    fetch('http://localhost:3001/price?asset=BTC')
    api.getPrice(params).then((res: AxiosResponse): void => {
      console.log(res)
      setPrice(res.data);
      setLoading(false);
      setError('');
    }).catch((error: AxiosError) => {
      if(error.response) {
        setError(error.response?.data?.message);
        setPrice(0);
        setLoading(false);
      }
    });
  }

  return (
    <div className="app">
      <select
        defaultValue=""
        placeholder="ASD"
        className="app__select"
        onChange={changeSelectOption}
      >
        <option value="" disabled hidden>Select asset</option>
        <option value="BTC">BTC</option>
        <option value="ETH">ETH</option>
        <option value="SMTH">SMTH</option>
        <option value="">EMPT</option>
      </select>
      <div className="app__price">
        {loading && <div>Loading....</div>}
        {!loading && price !== 0 && <div>{convertNumberToUSD(price)}</div>}
        {!loading && error && <div>{error}</div>}
      </div>
    </div>
  );
}

export default App;
