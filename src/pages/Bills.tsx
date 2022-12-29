import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ArrowUp, Cash, Clipboard, Reply} from "heroicons-react";
import Incomes from "../components/Cards/Incomes";
import AddIncome from "../components/Modals/AddIncome";
import {getAuth} from "firebase/auth";
import {collection, getDocs, orderBy, query} from "firebase/firestore";
import {db} from "../App";

export type IncomeType = {
  id?: string
  date: string
  name: string
  categorie: string
  amount: string
  description: string
  period: number
  startDate: string
}

const Bills = () => {
  const auth = getAuth()

  const [incomeOpen, setIncomeOpen] = useState(false);
  const [incomes, setIncomes] = useState<IncomeType[]>([]);

  const getCutDate = useCallback(() => {
    const month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const d = new Date();
    let name = month[d.getMonth()];

    return `${name}`

  }, [])

  const getIncomes = useCallback(async () => {
    const user = auth.currentUser
    if (user === null) {
      return
    }
    setIncomes([])
    const incomesArray = query(collection(db, "users", user.uid, "incomes"), orderBy('date', 'asc'))
    const querySnapshot = await getDocs(incomesArray);
    querySnapshot.forEach((doc) => {
      const isIncome = {
        id: doc.id,
        date: doc.data().date,
        name: doc.data().name,
        categorie: doc.data().categorie,
        amount: doc.data().amount,
        description: doc.data().description,
        period: doc.data().period,
        startDate: doc.data().startDate
      }
      setIncomes(prevState => [...prevState, isIncome])
    })
  }, [])

  const filterIncomesMonth = useMemo(() => {

    const today = new Date();
    const month = today.getMonth() + 1;

    return incomes.filter(income => {
      const incomeDate = new Date(income.date)
      const incomeMonth = incomeDate.getMonth() + 1
      return incomeMonth === month
    })

  },[incomes])

  const calculateTotal = useCallback(() => {
    let total = 0;
    filterIncomesMonth.forEach(income => {
      total += parseInt(income.amount)
    })
    return total
  },[incomes])

  const handleOpenIncome = useCallback(() => {
    setIncomeOpen(true)
  }, [incomeOpen])

  useEffect(() => {
    return (() => {
      getIncomes()
    })
  }, [getIncomes])


  return (
    <>
      <div className="flex flex-row items-center">
        <a href="/home/dashboard"><Reply width="36" height="36"/></a>
        <h1 className="ml-12">Ingresos/Egresos {getCutDate()} 2022</h1>
      </div>

      <AddIncome open={incomeOpen} incomes={incomes} setHidden={setIncomeOpen} setIncome={setIncomes}/>

      <div className="flex grid grid-cols-4 gap-2 w-full justify-center mt-4">
        <Incomes total={calculateTotal()} icon={<Cash className="text-white"/>} title={"Ingresos"}
                 subtitle={"Ingresos de este mes"}/>
        <Incomes total={0} icon={<Clipboard className="text-white"/>} title={"Egresos de este mes"}
                 subtitle={"Egresos de este mes"}/>
        <button className="w-full p-3 bg-gradient-fuchsia text-white rounded-md shadow" onClick={handleOpenIncome}>+
          Agregar Ingresos
        </button>
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
                  <small>{getCutDate()} {new Date().getFullYear()}</small>
                </div>
              </div>
            </div>
            <div className="flex-auto p-4 pt-6">
              <h6 className="mb-4 font-bold leading-tight uppercase text-size-xs text-slate-500">Este mes</h6>
              <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                {filterIncomesMonth.map((income, index) => {
                  return (
                    <li
                      key={index}
                      className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-t-inherit text-size-inherit rounded-xl">
                      <div className="flex items-center">
                        <button
                          className="leading-pro ease-soft-in text-size-xs bg-150 w-6.35 h-6.35 p-1.2 rounded-3.5xl tracking-tight-soft bg-x-25 mr-4 mb-0 flex cursor-pointer items-center justify-center border border-solid border-green-600 border-transparent bg-transparent text-center align-middle font-bold uppercase text-red-600 transition-all hover:opacity-75">
                          <ArrowUp className="text-green-600"/></button>
                        <div className="flex flex-col">
                          <h6 className="mb-1 leading-normal text-size-sm text-slate-700">{income.name}</h6>
                          <span className="leading-tight text-size-xs">{income.date}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <p
                          className="relative z-10 inline-block m-0 font-semibold leading-normal text-transparent bg-green-600 text-size-sm bg-clip-text">
                          $ {Number(income.amount).toLocaleString()}</p>
                      </div>
                    </li>)
                })}

              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Bills);