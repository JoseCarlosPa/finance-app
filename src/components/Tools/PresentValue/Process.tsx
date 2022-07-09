import React from 'react'

interface ProcessProps {
  period: number;
  value: number;
  rate: number;
}

const Process = ({period,value,rate}:ProcessProps) => {
  return(
    <>
      <div className="grid grid-cols-9 flex justify-center items-center">
        <div className="flex flex-row justify-center items-center">
          <p className="mr-2 ml-2"> = </p>
          <p>{value.toLocaleString()} / </p>
        </div>
        <div className="flex flex-row justify-center items-center">
          <p>(1 + {rate/100})^({period})</p>
        </div>
      </div>
      <div className="grid grid-cols-9 flex justify-center items-center">
        <div className="flex flex-row justify-center items-center">
          <p className="mr-2 ml-2"> = </p>
          <p>{value.toLocaleString()} / </p>
        </div>
        <div className="flex flex-row justify-center items-center">
          <p>( {(1 + rate/100).toFixed(4)})^({period})</p>
        </div>
      </div>
      <div className="grid grid-cols-9 flex justify-center items-center">
        <div className="flex flex-row justify-center items-center">
          <p className="mr-2 ml-2"> = </p>
          <p>{value.toLocaleString()} / </p>
        </div>
        <div className="flex flex-row justify-center items-center">
          <p>( {(Math.pow((1 + rate/100),period)).toFixed(4)})</p>
        </div>
      </div>
      <div className="grid grid-cols-9 flex justify-center items-center">
        <div className="flex flex-row justify-center items-center">
          <p className="mr-2 ml-2"> = </p>
          <p>{Number((value/(Math.pow((1+rate/100),period))).toFixed(4)).toLocaleString()}  </p>
        </div>

      </div>
    </>
  )
}

export default React.memo(Process)