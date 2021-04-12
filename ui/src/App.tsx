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
      <select className="app__select" onChange={changeSelectOption}>
        <option>BTC</option>
        <option>ETH</option>
      </select>
      <div className="app__price">123</div>
    </div>
  );
}

export default App;
