import React, {useCallback, useEffect, useState} from 'react'
import Card from "./Card";
import {CalendarOutline} from "heroicons-react";
import {singleCard} from "../../pages/CreditCards";
import {getAuth} from "firebase/auth";
import {collection, getDocs, orderBy, query, where} from "firebase/firestore";
import {db} from "../../App";

type CardAnalyticsProps = {
  card: singleCard
  setCards: React.Dispatch<React.SetStateAction<singleCard[]>>
  setEditCard: React.Dispatch<React.SetStateAction<singleCard>>
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CardAnalytics = ({card,setCards,setEditCard,setOpenEditModal}:CardAnalyticsProps) => {

  const auth = getAuth()
  const user = auth.currentUser
  const style = {border: '1px solid gray'}
  const [total, setTotal] = React.useState(0)
  const [paid, setPaid] = useState(0)
  const getCutDate = useCallback((cut_date: string) => {
    const month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const d = new Date();
    let name = month[d.getMonth() + 1];

    return `${name} ${cut_date} `

  }, [])

  const caluclateMaxPayTime = useCallback(()=>{
    const today = new Date()
    const month = today.getMonth()
    const year = today.getFullYear()
    const day = today.getDate()
    let payDay
    if(day > Number(card.cut_date)){
       payDay = new Date(`${year}-${month+1}-${card.cut_date}`)
    }else{
       payDay = new Date(`${year}-${month}-${card.cut_date}`)
    }
    const date = new Date(payDay.setDate(payDay.getDate() + 20))

    return date.toLocaleDateString('es-MX',{year: 'numeric', month: 'short', day: 'numeric'});
  },[])

  const calculatePaidOutcomes = useCallback(async()=>{
    if (user === null) {
      return
    }

    const day = caluclateMaxPayTime()
    const today = new Date()
    const month = today.getMonth()
    const year = today.getFullYear()
    const outcomesArray = query(
      collection(db, "users", user.uid, "outcomes"),
      where("date", ">=", new Date(`${year}-${month}-${card.cut_date}`)),
      where("date", "<=", new Date(day)),
      where("creditCard", "==", card.id))


    const querySnapshot = await getDocs(outcomesArray);
    let total = 0
    querySnapshot.forEach((doc) => {
      if(card.id === '0QbqaaEdR11kqQRL09wA'){
        console.log('Pantufla',doc.data().amount,doc.data().categorie)
      }
      if(doc.data().categorie === 'tarjetas'){
        total += Number(doc.data().amount)
      }
    })
    setPaid(total)
  },[])

  const calculateTotalForMonth = useCallback(async () => {
    if (user === null) {
      return
    }

    setTotal(0)
    const today = new Date()
    const month = today.getMonth()
    const year = today.getFullYear()
    const outcomesArray = query(
      collection(db, "users", user.uid, "outcomes"),
      where("date", ">=", new Date(`${year}-${month}-${card.cut_date}`)),
      where("date", "<=", new Date(`${year}-${month+1}-${card.cut_date}`)),
      where("creditCard", "==", card.id))
    const querySnapshot = await getDocs(outcomesArray);
    querySnapshot.forEach((doc) => {
      if(doc.data().categorie !== 'tarjetas'){
        setTotal((prev) => prev + Number(doc.data().amount))
      }

    })
    console.log('Pantufla Minus',paid)
    setTotal((prev) => prev - Number(paid))

  },[card.cut_date, user,paid])

  useEffect(() => {
    calculateTotalForMonth()
    calculatePaidOutcomes()
  }, [calculateTotalForMonth])

  return (
    <div className="flex grid grid-cols-6 mb-4 gap-2 ml-4">
      <div className="col-span-2">
        <Card card={card} setCards={setCards} setEditCard={setEditCard} setOpenEditModal={setOpenEditModal}/>
      </div>
      <div className="flex flex-col col-span-2 ml-2 ">
        <div className="flex flex-row w-full justify-center rounded-md glass" style={style}>
          <div className="flex flex-col text-center">
            <div className="flex flex-row">
              <div className="flex flex-col text-center p-2 ">
                <p>Monto Maximo</p>
                <p>$ {Number(card.max_balance).toLocaleString()}</p>
              </div>
              <div className="flex flex-col text-center p-2">
                <p>Monto Usado</p>
                <p>$ {Number(card.used_balance).toLocaleString()}</p>
              </div>
            </div>
            <p>Sobrante:</p>
            <p>$ {Number((Number(card.max_balance) - Number(card.used_balance)).toFixed(2)).toLocaleString()}</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center items-center">
              <span
                className="mr-2 font-semibold leading-tight text-size-xs">{((Number(card.used_balance) * 100) / Number(card.max_balance)).toFixed(2)}%</span>
          <div className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700">
            <div className="h-4 bg-blue-600 rounded-full bg-gradient-fuchsia"
                 style={{width: `${(Number(card.used_balance) * 100) / Number(card.max_balance)}%`}}></div>
          </div>
        </div>
      </div>
      <div className="col-span-2 flex flex-col">
        <div className="flex flex-row rounded-md  w-full h-8 justify-center items-center" style={style}>
          <p className="mt-3"><CalendarOutline/> Monto a pagar antes del: {caluclateMaxPayTime()} </p>
        </div>
        <div className="flex w-full justify-center align-middle items-center">
          $ {total}
        </div>
      </div>
    </div>
  );
}

export default React.memo(CardAnalytics)