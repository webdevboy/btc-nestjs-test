import React, { ChangeEvent, useState } from 'react';
import * as api from 'api';
import { IPriceParams } from 'api/interfaces';
import convertNumberToUSD from 'utils/convertNumberToUSD';

function App() {

  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const changeSelectOption = (e: ChangeEvent<HTMLSelectElement>): void => {
    const params: IPriceParams = {
      asset: e.target.value,
    };
    setLoading(true);
    api.getPrice(params).then((res: any): void => {
      console.log(res)
      setPrice(res.data);
      setLoading(false);
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
      </select>
      <div className="app__price">
        {loading && <div>Loading....</div>}
        {!loading && price !== 0 && <div>{convertNumberToUSD(price)}</div>}
      </div>
    </div>
  );
}

export default App;
