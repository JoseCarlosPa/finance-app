import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ArrowDown,
  ArrowUp,
  Cash,
  ChevronLeft,
  ChevronRight,
  Clipboard, CreditCard,
  Reply
} from "heroicons-react";
import Incomes from "../components/Cards/Incomes";
import AddIncome from "../components/Modals/AddIncome";
import {getAuth} from "firebase/auth";
import {collection, getDocs, orderBy, query} from "firebase/firestore";
import {db} from "../App";
import AddOutcome from "../components/Modals/AddOutcome";

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
  const [outcomeOpen, setOutcomeOpen] = useState(false);

  const [incomes, setIncomes] = useState<IncomeType[]>([]);
  const [outcomes, setOutcomes] = useState<IncomeType[]>([]);

  const [monthNumber, setMonthNumber] = useState<number>(1);

   const getCutDate = useCallback(() => {
    const month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const d = new Date();
    let name = month[d.getMonth() + (monthNumber - 1)];

    return `${name}`

  }, [monthNumber])

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
  }, [monthNumber])

  const getOutcomes = useCallback(async () => {
    const user = auth.currentUser
    if (user === null) {
      return
    }
    setOutcomes([])
    const outcomesArray = query(collection(db, "users", user.uid, "outcomes"), orderBy('date', 'asc'))
    const querySnapshot = await getDocs(outcomesArray);
    querySnapshot.forEach((doc) => {
      const isOutcome = {
        id: doc.id,
        date: doc.data().date,
        name: doc.data().name,
        categorie: doc.data().categorie,
        amount: doc.data().amount,
        description: doc.data().description,
        period: doc.data().period,
        startDate: doc.data().startDate
      }
      setOutcomes(prevState => [...prevState, isOutcome])
    })
  }, [monthNumber])

  const filterIncomesMonth = useMemo(() => {

    const today = new Date();
    const month = today.getMonth() + monthNumber;
    return incomes.filter(outCome => {
      const incomesDate = new Date(outCome.date)
      const incomeMonth = incomesDate.getMonth() + monthNumber
      return incomeMonth === month
    })

  }, [incomes, monthNumber])

  const filterOutComesMonth = useMemo(() => {

    const today = new Date();
    const month = today.getMonth() + monthNumber;

    return outcomes.filter(outCome => {
      const outComeDate = new Date(outCome.date)
      const outComeMonth = outComeDate.getMonth() + monthNumber
      return outComeMonth === month
    })

  }, [outcomes, monthNumber])

  const calculateTotal = useCallback(() => {
    let total = 0;
    filterIncomesMonth.forEach(income => {
      total += parseInt(income.amount)
    })
    return total
  }, [incomes])

  const calculateTotalOutcomes = useCallback(() => {
    let total = 0;
    filterOutComesMonth.forEach(outcome => {
      total += parseInt(outcome.amount)
    })
    return total
  }, [outcomes,monthNumber])

  const handleOpenIncome = useCallback(() => {
    setIncomeOpen(true)
  }, [incomeOpen])

  const handleOpenOutCome = useCallback(() => {
    setOutcomeOpen(true)
  }, [outcomeOpen])

  useEffect(() => {
      getIncomes()
      getOutcomes()
  }, [getIncomes, getOutcomes])

  const handleArrowLeft = useCallback(() => {
    setMonthNumber(monthNumber - 1)
  }, [monthNumber])

  const handleArrowRight = useCallback(() => {
    setMonthNumber(monthNumber + 1)
  }, [monthNumber])

  return (
    <>
      <div className="flex flex-row items-center">
        <a href="/home/dashboard"><Reply width="36" height="36"/></a>
        <h1 className="ml-12">Ingresos/Egresos {getCutDate()} 2022</h1>
      </div>

      <AddIncome open={incomeOpen} incomes={incomes} setHidden={setIncomeOpen} setIncome={setIncomes}/>
      <AddOutcome open={outcomeOpen} outcomes={outcomes} setHidden={setOutcomeOpen} setOutcome={setOutcomes}/>


      <div className="flex grid grid-cols-3 gap-2 w-full justify-center mt-4">
        <Incomes total={calculateTotal()} icon={<Cash className="text-white"/>} title={"Ingresos"}
                 subtitle={"Ingresos de este mes"}/>
        <Incomes total={calculateTotalOutcomes()} icon={<Clipboard className="text-white"/>} title={"Egresos de este mes"}
                 subtitle={"Egresos de este mes"}/>
        <Incomes total={calculateTotal() - calculateTotalOutcomes()} icon={<CreditCard className="text-white"/>} title={"Sobran"} subtitle={"Sobran para gastar"}/>
      </div>
      <div className="flex flex-row justify-center mt-4 gap-6 mx-4">
        <button className="w-full p-3 bg-gradient-fuchsia text-white rounded-md shadow" onClick={handleOpenIncome}>+
          Agregar Ingresos
        </button>
        <button className="w-full p-3 bg-gradient-fuchsia text-white rounded-md shadow" onClick={handleOpenOutCome}>+
          Agregar Egresos
        </button>
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
                  <div className="flex flex-row align-middle items-center">
                    <button className="mr-2" onClick={handleArrowLeft}><ChevronLeft className="w-4"/></button>
                    <small>{getCutDate()} {new Date().getFullYear()}</small>
                    <button className="ml-2" onClick={handleArrowRight}><ChevronRight className="w-4"/></button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-auto p-4 pt-6">
              <h6 className="mb-4 font-bold leading-tight uppercase text-size-xs text-slate-500">Este mes</h6>
              <div className="grid grid-cols-2">
                <div className="">
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
                              <span
                                className="leading-tight text-size-xs">{new Date(income.date).toLocaleDateString("es-MX")}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-center justify-center">
                            <p
                              className="relative z-10 inline-block m-0 font-semibold leading-normal text-transparent bg-green-600 text-size-sm bg-clip-text">
                              $ {Number(income.amount).toLocaleString("es-MX")}</p>
                          </div>
                        </li>)
                    })}

                  </ul>
                </div>
                <div className="border-l-gray-500 border-l-2">
                  <ul className="flex flex-col pl-0 mb-0 rounded-lg ">
                    {filterOutComesMonth.map((income, index) => {
                      return (
                        <li
                          key={index}
                          className="relative flex justify-between px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-t-inherit text-size-inherit rounded-xl">
                          <div className="flex items-center">
                            <button
                              className="leading-pro ease-soft-in text-size-xs bg-150 w-6.35 h-6.35 p-1.2 rounded-3.5xl tracking-tight-soft bg-x-25 mr-4 mb-0 flex cursor-pointer items-center justify-center border border-solid border-green-600 border-transparent bg-transparent text-center align-middle font-bold uppercase text-red-600 transition-all hover:opacity-75">
                              <ArrowDown className="text-red-600"/></button>
                            <div className="flex flex-col">
                              <h6 className="mb-1 leading-normal text-size-sm text-slate-700">{income.name}</h6>
                              <span
                                className="leading-tight text-size-xs">{new Date(income.date).toLocaleDateString("es-MX")}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-center justify-center">
                            <p
                              className="relative z-10 inline-block m-0 font-semibold leading-normal text-transparent bg-red-600 text-size-sm bg-clip-text">
                              $ {Number(income.amount).toLocaleString("es-MX")}</p>
                          </div>
                        </li>)
                    })}

                  </ul>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Bills);