import React, {useEffect, useState} from 'react'
import {alphaApiKey, alphaApiUrl} from "../config/apiTokens";
import {getFinanceValue} from "../api/alphaVentage";
import SimpleCard from "../components/Cards/SimpleCard";
import {CurrencyDollar, CurrencyEuro, Database} from "heroicons-react";

const Investments = () => {

  const [PlataMxn, setPrecioPlataMxn] = useState<number | null>(0);
  const [usd, setUsd] = useState<number | null>(0);
  const [euro, setEuro] = useState<number | null>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
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

      const eurToMex = await getFinanceValue(alphaApiUrl, alphaApiKey, 'EUR', 'MXN').then(
        (data: any) => {
          return parseFloat(data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
        }
      );

      const precioPlataMxn = precioPlataUsd * usdToMex;
      setUsd(usdToMex);
      setEuro(eurToMex);
      setPrecioPlataMxn(precioPlataMxn);

    }
    getSilver();
    setLoading(false);

  }, [])

  return (
    <div>
      <h1>Inversiones</h1>
      {loading ? <div className="text-center">Cargando...</div> : <div className="flex grid grid-cols-4">
        <SimpleCard color={'bg-blue-500'} title={'Plata - XAG'} value={Number(PlataMxn?.toFixed(2))}
                    icon={<Database className="text-white w-6 h-6"/>}/>
        <SimpleCard color={'bg-blue-500'} title={'Dolar - USD'} value={Number(usd?.toFixed(2))}
                    icon={<CurrencyDollar className="text-white w-6 h-6"/>}/>
        <SimpleCard color={'bg-blue-500'} title={'Euro - EUR'} value={Number(euro?.toFixed(2))}
                    icon={<CurrencyEuro className="text-white w-6 h-6"/>}/>
      </div>}

    </div>
  )
}
export default React.memo(Investments)