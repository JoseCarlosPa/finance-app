import React, {useEffect, useState} from 'react'
import axios from "axios";
import {alphaApiKey, alphaApiUrl} from "../config/apiTokens";
import {getFinanceValue} from "../api/alphaVentage";

const Investments = () => {

  const [PlataMxn, setPrecioPlataMxn] = useState<number | null>(0);

  useEffect(() => {
    const getSilver = async () => {
      const precioPlataUsd = await getFinanceValue(alphaApiUrl, alphaApiKey, 'XAG', 'USD').then(
        (data: any) => {
          return parseFloat(data['Realtime Currency Exchange Rate']['8. Bid Price']);
        }
      );
      const usdToMex = await getFinanceValue(alphaApiUrl, alphaApiKey, 'USD', 'MXN').then(
        (data: any) => {
          return parseFloat(data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
        }
      );

      const precioPlataMxn = precioPlataUsd * usdToMex;
      setPrecioPlataMxn(precioPlataMxn);

    }
    getSilver();

  },[])

  return (
    <div>
      <h1>Investments</h1>
      <p>El precio de la plata en pesos mexicanos es: $ {PlataMxn?.toFixed(2)}</p>
    </div>
  )
}
export default React.memo(Investments)