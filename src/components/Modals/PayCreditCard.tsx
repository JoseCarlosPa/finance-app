import React, {useCallback, useEffect, useState} from 'react'
import {CreditCard, X} from "heroicons-react";
import {singleCard} from "../../pages/CreditCards";
import {getAuth} from "firebase/auth";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {addDoc, collection, doc, updateDoc} from "firebase/firestore";
import {db} from "../../App";

interface PayCreditCardProps {
  open: boolean
  setHidden: (isOpen: boolean) => void
  card: singleCard
  cards: singleCard[]
  setCards: React.Dispatch<React.SetStateAction<singleCard[]>>
}

const PayCreditCard = ({open,setHidden,card,cards,setCards}:PayCreditCardProps) => {
  const auth = getAuth()
  const MySwal = withReactContent(Swal)

  const show = () => {
    if (open) {
      return ''
    }

    return 'hidden'
  }

  const handleClose = () => {
    setHidden(false)
  }
  const handleSubmit = useCallback(async(event:any)=>{
    event.preventDefault()
    const user = auth.currentUser
    try {
      if (user === null) {
        return
      }

      const newPayment = {
        date: new Date().toISOString(),
        amount: event.target.amount.value,
        description: event.target.description.value,
      }

      const creditCards = {
        id: card.id,
        name: card.name,
        bank: card.bank,
        card_number: card.card_number,
        max_balance: card.max_balance,
        used_balance: Number(card.used_balance) - Number(event.target.amount.value) ,
        cut_date: card.cut_date,
      }
      const payments = collection(db,'users',user.uid,'credit_cards',card.id,'payments')
      const creditCardsRef = doc(db,'users',user.uid,'credit_cards',card.id)


      await addDoc(payments,newPayment).then((doc:any)=>{})
      await updateDoc(creditCardsRef,creditCards).then((doc:any)=>{
        const updateCards = cards.map((local:singleCard)=>{
          if(local.id === card.id){
            return {...local, name: card.name, bank: card.bank, card_number: card.card_number, max_balance: card.max_balance, used_balance:  (Number(card.used_balance) - Number(event.target.amount.value)).toString(), cut_date: card.cut_date}
          }
          return local
        })
        setHidden(false)

        setCards(updateCards)
        MySwal.fire('Exito!', 'Tu tarjeta fue editada con exito!', 'success')
      })

    }catch (error){
      setHidden(false)
      MySwal.fire('ERROR!',
        `${error}`,
        'error').then(() => {
      })
    }
  },[card])

  return(
    <div className={`transition justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ml-64  ${show()}`}>
      <div className="relative w-4/12 my-6 mx-auto max-w-3xl">
        <form onSubmit={handleSubmit}
              className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-3xl font-semibold">
              Pago a tarjeta: {card.name}
            </h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={handleClose}
            >
              <X/>
            </button>
          </div>

          <div className="p-6">
            <div className="flex flex-col">
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-2">
                    $ Monto del pago
                  </label>
                  <input
                    className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="amount" type="number" step="0.01" placeholder="Ejemplo: 350.50" name="amount" required/>
              </div>
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Descripción
                </label>
                <input
                  className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description" type="text"  placeholder="Ejemplo: pago de telefono " name="description" required/>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button
              className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleClose}
            >
              Cerrar
            </button>
            <button
              className="bg-gradient-fuchsia text-white  font-bold uppercase px-6 py-3 text-sm shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 rounded"
              type="submit"
            >
              Pagar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default React.memo(PayCreditCard)