import React, {useEffect, useState} from 'react'
import axios from "axios";

const Investments = () => {

  const [PlataMxn, setPrecioPlataMxn] = useState<number | null>(0);

  useEffect(() => {
    const apiUrl = 'https://www.alphavantage.co/query';
    const apiKey = 'HOTTIR58DURTJEYY';

    // Realizar las dos solicitudes a la API de Alpha Vantage en paralelo
    Promise.all([
      fetch(`${apiUrl}?function=CURRENCY_EXCHANGE_RATE&from_currency=XAG&to_currency=USD&apikey=${apiKey}`),
      fetch(`${apiUrl}?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=MXN&apikey=${apiKey}`)
    ])
      .then(responses => Promise.all(responses.map(response => response.json())))
      .then(data => {
        // Obtener el precio de venta actual de la plata en dólares estadounidenses
        const precioPlataUsd = parseFloat(data[0]['Realtime Currency Exchange Rate']['8. Bid Price']);
        // Obtener el tipo de cambio actual entre el dólar estadounidense y el peso mexicano
        const usdToMxn = parseFloat(data[1]['Realtime Currency Exchange Rate']['5. Exchange Rate']);
        // Realizar la conversión del valor de la plata de dólares a pesos mexicanos
        const precioPlataMxn = precioPlataUsd * usdToMxn;
        // Actualizar el estado con el precio de la plata en pesos mexicanos
        setPrecioPlataMxn(precioPlataMxn);
      })
      .catch(error => {
        console.error(error);
        setPrecioPlataMxn(null);
      });
  }, []);

  return (
    <div>
      <h1>Investments</h1>
      <p>El precio de la plata en pesos mexicanos es: $ {PlataMxn?.toFixed(2)}</p>
    </div>
  )
}
export default React.memo(Investments)