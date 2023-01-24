import React from 'react';
import PieChart from "./Graphs/PieChart";
import BarChart from "./Graphs/BarChart";

export type labelCounter = {
    label: string,
    count: number
    color: string
}

export const getMonthDate = () => {
  const month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const d = new Date();
  let name = month[d.getMonth()];
  return `${name}`
}

const Dashboard = () => {

  return (
    <>
      <main className="">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <h2>Control de gastos del mes:  {getMonthDate()}</h2>
          </div>
          <div className="flex flex-row gap-4">
            <PieChart/>
            <BarChart />
          </div>
        </div>
      </main>
    </>
  )
}
export default React.memo(Dashboard);