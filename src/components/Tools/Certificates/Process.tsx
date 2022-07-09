import React from 'react'

interface ProcessProps {
  period: number;
  cupon: number;
  rate: number;
  value: number;
}

const Process = ({period, cupon, rate, value}: ProcessProps) => {

  const vp = (value / (Math.pow((1 + rate / 100), period))).toFixed(4)

  return (
    <>
      <div className="grid grid-cols-6 flex justify-center items-center">
        <div className="flex flex-row justify-center items-center">
          <p className="mr-2 ml-2"> = </p>
          <p>{cupon.toLocaleString()} * </p>
        </div>
        <div className="flex flex-row justify-center items-center">
          <p className="-mt-10 -mr-8"> 1 - </p>
          <div className="flex flex-col justify-center items-center ">
            <p className=""> 1 </p>
            <p className="-mt-6">-----------</p>
            <p className="-mt-6">(1 + {rate / 100})^({period})</p>
            <p className="-mt-6">-----------------------</p>
            <p className="-mt-6">{rate / 100}</p>
          </div>
        </div>

        <div className="flex flex-row justify-center items-center">
          <p> + </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p>{value.toLocaleString()}</p>
          <p className="-mt-6">-----------</p>
          <p className="-mt-6">(1 + {rate / 100})^({period})</p>
        </div>
      </div>
      <div className="grid grid-cols-6 flex justify-center items-center">
        <div className="flex flex-row justify-center items-center">
          <p className="mr-2 ml-2"> = </p>
          <p>{cupon.toLocaleString()} * </p>
        </div>
        <div className="flex flex-row justify-center items-center">
          <p className="-mt-10 -mr-8"> 1 - </p>
          <div className="flex flex-col justify-center items-center ">
            <p className=""> 1 </p>
            <p className="-mt-6">-----------</p>
            <p className="-mt-6">( {1 + rate / 100})^({period})</p>
            <p className="-mt-6">-----------------------</p>
            <p className="-mt-6">{rate / 100}</p>
          </div>
        </div>

        <div className="flex flex-row justify-center items-center">
          <p> + </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p>{value.toLocaleString()}</p>
          <p className="-mt-6">-----------</p>
          <p className="-mt-6">( {1 + rate / 100})^({period})</p>
        </div>
      </div>
      <div className="grid grid-cols-6 flex justify-center items-center">
        <div className="flex flex-row justify-center items-center">
          <p className="mr-2 ml-2"> = </p>
          <p>{cupon.toLocaleString()} * </p>
        </div>
        <div className="flex flex-row justify-center items-center">
          <p className="-mt-10 -mr-8"> 1 - </p>
          <div className="flex flex-col justify-center items-center ">
            <p className=""> 1 </p>
            <p className="-mt-6">-----------</p>
            <p className="-mt-6">({(Math.pow((1 + rate / 100), period)).toFixed(4)})</p>
            <p className="-mt-6">-----------------------</p>
            <p className="-mt-6">{rate / 100}</p>
          </div>
        </div>

        <div className="flex flex-row justify-center items-center">
          <p> + </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p>{value.toLocaleString()}</p>
          <p className="-mt-6">-----------</p>
          <p className="-mt-6">( {(Math.pow((1 + rate / 100), period)).toFixed(4)})</p>
        </div>
      </div>
      <div className="grid grid-cols-6 flex justify-center items-center mt-8">
        <div className="flex flex-row justify-center items-center">
          <p className="mr-2 ml-2"> = </p>
          <p>{cupon.toLocaleString()} * </p>
        </div>
        <div className="flex flex-row justify-center items-center mt-4">
          <p className="-mt-16 -mr-8"> 1 - </p>
          <div className="flex flex-col justify-center items-center ">
            <p className="-mt-6">{(1 / (Math.pow((1 + rate / 100), period))).toFixed(4)}</p>
            <p className="-mt-6">-----------------------</p>
            <p className="-mt-6">{rate / 100}</p>
          </div>
        </div>

        <div className="flex flex-row justify-center items-center">
          <p> + </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p>{Number(vp).toLocaleString()}</p>
        </div>
      </div>
      <div className="grid grid-cols-6 flex justify-center items-center mt-8">
        <div className="flex flex-row justify-center items-center">
          <p className="mr-2 ml-2"> = </p>
          <p>{cupon.toLocaleString()} * </p>
        </div>
        <div className="flex flex-row justify-center items-center mt-4">
          <div className="flex flex-col justify-center items-center ">
            <p className="-mt-6">{(1 - (1 / (Math.pow((1 + rate / 100), period)))).toFixed(4)}</p>
            <p className="-mt-6">-----------------------</p>
            <p className="-mt-6">{rate / 100}</p>
          </div>
        </div>

        <div className="flex flex-row justify-center items-center">
          <p> + </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p>{Number(vp).toLocaleString()}</p>
        </div>
      </div>
      <div className="grid grid-cols-6 flex justify-center items-center mt-8">
        <div className="flex flex-row justify-center items-center">
          <p className="mr-2 ml-2"> = </p>
          <p>{cupon.toLocaleString()} * </p>
        </div>
        <div className="flex flex-row justify-center items-center mt-4">
          <div className="flex flex-col justify-center items-center ">
            <p>{((1 - (1 / (Math.pow((1 + rate / 100), period)))) / (rate / 100)).toFixed(4)}</p>
          </div>
        </div>

        <div className="flex flex-row justify-center items-center">
          <p> + </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p>{Number(vp).toLocaleString()}</p>
        </div>
      </div>
      <div className="grid grid-cols-6 flex justify-center items-center mt-8">
        <div className="flex flex-row justify-center items-center">
          <p className="mr-2 ml-2"> = </p>
        </div>
        <div className="flex flex-row justify-center items-center ">
          <div className="flex flex-col justify-center items-center ">
            <p>{(cupon * ((1 - (1 / (Math.pow((1 + rate / 100), period)))) / (rate / 100))).toFixed(4)}</p>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center">
          <p> + </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p>{Number(vp).toLocaleString()}</p>
        </div>
      </div>
      <div className="grid grid-cols-6 flex justify-center items-center mt-8">
        <div className="flex flex-row justify-center items-center">
          <p className="mr-2 ml-2"> = </p>
        </div>
        <div className="flex flex-row justify-center items-center border-2 border-green-500 ">
          <p>{((cupon * ((1 - (1 / (Math.pow((1 + rate / 100), period)))) / (rate / 100))) + (value / (Math.pow((1 + rate / 100), period)))).toFixed(4)}</p>
        </div>
      </div>
    </>)
}
export default React.memo(Process)
