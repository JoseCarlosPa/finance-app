import React, {useCallback, useEffect, useState} from 'react'
import {singleCard} from "../../pages/CreditCards";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../App";
import {getAuth} from "firebase/auth";

type BillCardProps = {
  card: singleCard
}
const BillCard = ({card}:BillCardProps) => {

  const [total, setTotal] = React.useState(0)
  const auth = getAuth()
  const user = auth.currentUser
  const [paid, setPaid] = useState(0)


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

    return date;
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

    setTotal((prev) => prev - Number(paid))

  },[card.cut_date, user,paid])

  useEffect(() => {
    calculateTotalForMonth()
    calculatePaidOutcomes()
  }, [calculateTotalForMonth])


  return(<div className="h-44 m-auto bg-blue-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-105">
    <img className="relative object-cover w-full h-full rounded-xl"
         src="https://i.imgur.com/kGkSg1v.png" />
    <div className="w-full px-8 absolute top-8">
      <div className="flex justify-between">
        <div className="">
          <p className="font-medium tracking-widest">
            {card.name}
          </p>
        </div>
        <img className="w-14 h-14" src="https://i.imgur.com/bbPHJVe.png"/>
      </div>
      <div className="pt-1">
        <p className="font-medium tracking-more-wider">
          *** *** *** {card.card_number}
        </p>
      </div>
      <div className="pt-1">
        <p className="font-medium tracking-more-wider">
          $ {total}
        </p>
      </div>
    </div>
  </div>)
}

export default React.memo(BillCard)