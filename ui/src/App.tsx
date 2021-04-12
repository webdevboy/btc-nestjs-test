import React, { ChangeEvent, useState } from 'react';
import * as api from 'api';
import { IPriceParams } from 'api/interfaces';

function App() {

  const [price, setPrice] = useState(null);

  const changeSelectOption = (e: ChangeEvent<HTMLSelectElement>): void => {
    const params: IPriceParams = {
      asset: e.target.value,
    };
    api.getPrice(params).then((res: any): void => {
      console.log(res)
    });
  }

  return (
    <div className="app">
      <select placeholder="ASD" className="app__select" onChange={changeSelectOption}>
        <option value="" selected disabled hidden>Select asset</option>
        <option value="BTC">BTC</option>
        <option value="ETH">ETH</option>
      </select>
      <div className="app__price">123</div>
    </div>
  );
}

export default App;
