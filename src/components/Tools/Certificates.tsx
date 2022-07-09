import React, {useCallback, useState} from 'react'
import {QuestionMarkCircleOutline, Reply} from "heroicons-react";

const Certificates = () => {

  const [period, setPeriod] = useState<number>(0)
  const [cupon, setCupon] = useState<number>(0)
  const [rate, setRate] = useState<number>(0)
  const [value, setValue] = useState<number>(0)

  const handleCalculate = useCallback(()=>{
    if(period !== 0 && cupon !== 0  && rate !== 0 && value !== 0){
      return ((cupon * ((1 - (1 / (1 + (rate / 100)))) / (rate / 100))) + (value / Math.pow((1 + (rate / 100)), period))).toFixed(4)
    }

    return 0
  },[cupon, period, rate, value])

  return (
    <>
      <div className="flex flex-row items-center">
        <a href="/home/herramientas"><Reply width="36" height="36"/></a>
        <h1 className="ml-12">Calculo de Bonos</h1>
      </div>
      <div className="grid grid-cols-4 gap-x-3">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Periodo (Años) <QuestionMarkCircleOutline width="12" height="12"  /></label>
          <div className="flex flex-row">
            <input
              type="number"
              onChange={(e) => setPeriod(Number(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ejemplo: 9"
              step="0.1"
            ></input>
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Valor del cupon (MXN) <QuestionMarkCircleOutline width="12" height="12" /></label>
          <div className="flex flex-row">
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ejemplo: 80"
              step="0.1"
              onChange={(e) => setCupon(Number(e.target.value))}
            ></input>
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Taza de rendimeinto (%) <QuestionMarkCircleOutline width="12" height="12" /></label>
          <div className="flex flex-row">
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ejemplo: 10"
              step="0.1"
              onChange={(e) => setRate(Number(e.target.value))}
            ></input>
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Valor Nominal (MXN) <QuestionMarkCircleOutline width="12" height="12" /></label>
          <div className="flex flex-row">
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ejemplo: 10"
              step="0.1"
              onChange={(e) => setValue(Number(e.target.value))}
            ></input>
          </div>
        </div>
      </div>
      <div className="flex flex-row mt-4 border-2 rounded border-green-500 w-52 py-3 px-4">
      $ {handleCalculate()}
      </div>
    </>



  )
}
export default React.memo(Certificates)