import React, {useCallback, useState} from 'react';
import {ArrowDown, ArrowUp, Cash, Clipboard, Reply} from "heroicons-react";
import Incomes from "../components/Cards/Incomes";
import AddIncome from "../components/Modals/AddIncome";

export type IncomeType = {
  id?: string
  date: string
  name: string
  categorie: string
  amount: string
  description: string
}

const Bills = () => {

  const [incomeOpen, setIncomeOpen] = useState(false);
  const [incomes, setIncomes] = useState<IncomeType[]>([]);

  const getCutDate = useCallback(()=>{
    const month = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    const d = new Date();
    let name = month[d.getMonth()];

    return `${name}`

  },[])


  const handleOpenIncome = useCallback(()=>{
    setIncomeOpen(true)
  },[incomeOpen])

  return (
    <>
      <div className="flex flex-row items-center">
        <a href="/home/dashboard"><Reply width="36" height="36"/></a>
        <h1 className="ml-12">Ingresos/Egresos {getCutDate()} 2022</h1>
      </div>

      <AddIncome open={incomeOpen} incomes={incomes} setHidden={setIncomeOpen} setIncome={setIncomes}/>

      <div className="flex grid grid-cols-4 gap-2 w-full justify-center mt-4">
        <Incomes total={944} icon={<Cash className="text-white" />} title={"Ingresos"} subtitle={"Ingresos de este mes"} />
        <Incomes total={944} icon={<Clipboard className="text-white" />} title={"Egresos de este mes"} subtitle={"Egresos de este mes"} />
        <button className="w-full p-3 bg-gradient-fuchsia text-white rounded-md shadow" onClick={handleOpenIncome}>+ Agregar Ingresos</button>
        <button className="w-full p-3 bg-gradient-fuchsia text-white rounded-md shadow">+ Agregar Egresos</button>
      </div>
      <div className="flex flex-col">
        <div className="w-full max-w-full px-3 mt-6  md:flex-none">
          <div
            className="relative flex flex-col h-full min-w-0 mb-6 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
            <div className="p-6 px-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
              <div className="flex flex-wrap -mx-3">
                <div className="max-w-full px-3 md:w-1/2 md:flex-none">
                </div>
                <div className="flex items-center justify-end max-w-full px-3 md:w-1/2 md:flex-none">
                  <i className="mr-2 far fa-calendar-alt"></i>
                  <small>01 - 30 {getCutDate()} 2022</small>
                </div>
              </div>
            </div>
            <div className="flex-auto p-4 pt-6">
              <h6 className="mb-4 font-bold leading-tight uppercase text-size-xs text-slate-500">Newest</h6>
              <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                <li
                  className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-t-inherit text-size-inherit rounded-xl">
                  <div className="flex items-center">
                    <button
                      className="leading-pro ease-soft-in text-size-xs bg-150 w-6.35 h-6.35 p-1.2 rounded-3.5xl tracking-tight-soft bg-x-25 mr-4 mb-0 flex cursor-pointer items-center justify-center border border-solid border-red-600 border-transparent bg-transparent text-center align-middle font-bold uppercase text-red-600 transition-all hover:opacity-75">
                      <ArrowDown  className="text-red-600"/></button>
                    <div className="flex flex-col">
                      <h6 className="mb-1 leading-normal text-size-sm text-slate-700">Netflix</h6>
                      <span className="leading-tight text-size-xs">27 March 2020, at 12:30 PM</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p
                      className="relative z-10 inline-block m-0 font-semibold leading-normal text-transparent bg-gradient-red text-size-sm bg-clip-text">-
                      $ 2,500</p>
                  </div>
                </li>
                <li
                  className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 border-t-0 rounded-b-inherit text-size-inherit rounded-xl">
                  <div className="flex items-center">
                    <button
                      className="leading-pro ease-soft-in text-size-xs bg-150 w-6.35 h-6.35 p-1.2 rounded-3.5xl tracking-tight-soft bg-x-25 mr-4 mb-0 flex cursor-pointer items-center justify-center border border-solid border-lime-500 border-transparent bg-transparent text-center align-middle font-bold uppercase text-lime-500 transition-all hover:opacity-75">
                      <ArrowUp  className="text-green-600"/></button>
                    <div className="flex flex-col">
                      <h6 className="mb-1 leading-normal text-size-sm text-slate-700">Apple</h6>
                      <span className="leading-tight text-size-xs">27 March 2020, at 04:30 AM</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p
                      className="relative z-10 inline-block m-0 font-semibold leading-normal text-transparent bg-gradient-lime text-size-sm bg-clip-text">+
                      $ 2,000</p>
                  </div>
                </li>
              </ul>
              <h6 className="my-4 font-bold leading-tight uppercase text-size-xs text-slate-500">Yesterday</h6>
              <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                <li
                  className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-t-inherit text-size-inherit rounded-xl">
                  <div className="flex items-center">
                    <button
                      className="leading-pro ease-soft-in text-size-xs bg-150 w-6.35 h-6.35 p-1.2 rounded-3.5xl tracking-tight-soft bg-x-25 mr-4 mb-0 flex cursor-pointer items-center justify-center border border-solid border-lime-500 border-transparent bg-transparent text-center align-middle font-bold uppercase text-lime-500 transition-all hover:opacity-75">
                      <i className="fas fa-arrow-up text-size-3xs"></i></button>
                    <div className="flex flex-col">
                      <h6 className="mb-1 leading-normal text-size-sm text-slate-700">Stripe</h6>
                      <span className="leading-tight text-size-xs">26 March 2020, at 13:45 PM</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p
                      className="relative z-10 inline-block m-0 font-semibold leading-normal text-transparent bg-gradient-lime text-size-sm bg-clip-text">+
                      $ 750</p>
                  </div>
                </li>
                <li
                  className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 border-t-0 text-size-inherit rounded-xl">
                  <div className="flex items-center">
                    <button
                      className="leading-pro ease-soft-in text-size-xs bg-150 w-6.35 h-6.35 p-1.2 rounded-3.5xl tracking-tight-soft bg-x-25 mr-4 mb-0 flex cursor-pointer items-center justify-center border border-solid border-lime-500 border-transparent bg-transparent text-center align-middle font-bold uppercase text-lime-500 transition-all hover:opacity-75">
                      <i className="fas fa-arrow-up text-size-3xs"></i></button>
                    <div className="flex flex-col">
                      <h6 className="mb-1 leading-normal text-size-sm text-slate-700">HubSpot</h6>
                      <span className="leading-tight text-size-xs">26 March 2020, at 12:30 PM</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p
                      className="relative z-10 inline-block m-0 font-semibold leading-normal text-transparent bg-gradient-lime text-size-sm bg-clip-text">+
                      $ 1,000</p>
                  </div>
                </li>
                <li
                  className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 border-t-0 text-size-inherit rounded-xl">
                  <div className="flex items-center">
                    <button
                      className="leading-pro ease-soft-in text-size-xs bg-150 w-6.35 h-6.35 p-1.2 rounded-3.5xl tracking-tight-soft bg-x-25 mr-4 mb-0 flex cursor-pointer items-center justify-center border border-solid border-lime-500 border-transparent bg-transparent text-center align-middle font-bold uppercase text-lime-500 transition-all hover:opacity-75">
                      <i className="fas fa-arrow-up text-size-3xs"></i></button>
                    <div className="flex flex-col">
                      <h6 className="mb-1 leading-normal text-size-sm text-slate-700">Creative Tim</h6>
                      <span className="leading-tight text-size-xs">26 March 2020, at 08:30 AM</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p
                      className="relative z-10 items-center inline-block m-0 font-semibold leading-normal text-transparent bg-gradient-lime text-size-sm bg-clip-text">+
                      $ 2,500</p>
                  </div>
                </li>
                <li
                  className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 border-t-0 rounded-b-inherit text-size-inherit rounded-xl">
                  <div className="flex items-center">
                    <button
                      className="leading-pro ease-soft-in text-size-xs bg-150 w-6.35 h-6.35 p-1.2 rounded-3.5xl tracking-tight-soft bg-x-25 mr-4 mb-0 flex cursor-pointer items-center justify-center border border-solid border-slate-700 border-transparent bg-transparent text-center align-middle font-bold uppercase text-slate-700 transition-all hover:opacity-75">
                      <i className="fas fa-exclamation text-size-3xs"></i></button>
                    <div className="flex flex-col">
                      <h6 className="mb-1 leading-normal text-size-sm text-slate-700">Webflow</h6>
                      <span className="leading-tight text-size-xs">26 March 2020, at 05:00 AM</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <p
                      className="flex items-center m-0 font-semibold leading-normal text-size-sm text-slate-700">Pending</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Bills);