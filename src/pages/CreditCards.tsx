import React, {useCallback, useEffect, useState} from 'react'
import {CreditCard, Reply} from "heroicons-react";
import CreditCardsModal from "../components/Modals/CreditCardsModal";
import {collection, query, getDocs} from "firebase/firestore";
import {db} from "../App";
import {getAuth} from "firebase/auth";
import Card from "../components/CreditCards/Card";

export type singleCard = {
  id: string
  name: string
  bank: string
  card_number: string
  max_balance: string
  used_balance: string

}


const CreditCards = () => {

  const [cards, setCards] = useState<singleCard[]>([])
  const [openModal, setOpenModal] = useState<boolean>(false)
  const auth = getAuth()

  const getCreditCards = useCallback(async () => {
    const user = auth.currentUser
    if (user === null) {
      return
    }
    setCards([])
    const creditCardsArray = query(collection(db, "users", user.uid, "credit_cards"));
    const querySnapshot = await getDocs(creditCardsArray);
    querySnapshot.forEach((doc) => {
      const isCard = {
        id: doc.id,
        name: doc.data().name,
        bank: doc.data().bank,
        card_number: doc.data().card_number,
        max_balance: doc.data().max_balance,
        used_balance: doc.data().used_balance,

      }
      setCards(cards => [...cards, isCard])
    });
  }, [auth.currentUser])


  useEffect(() => {
    return (() => {
      getCreditCards()
    })
  }, [getCreditCards])


  const renderCards = useCallback(() => {
    return (
      cards.map((card, index) => {
        return (<div className="flex grid grid-cols-6 mb-4" key={index}>
          <div className="col-span-2">
            <Card card={card} setCards={setCards}/>
          </div>
          <div className="flex flex-col col-span-2">
            <div className="flex items-center justify-center">
              <span className="mr-2 font-semibold leading-tight text-size-xs">{(Number(card.used_balance)*100)/Number(card.max_balance)}%</span>
              <div>
                <div className="text-size-xs h-0.75 w-30 m-0 flex overflow-visible rounded-lg bg-gray-200">
                  <div
                    className="duration-600 ease-soft bg-gradient-cyan -mt-0.38 -ml-px flex h-1.5 w-3/5 flex-col justify-center overflow-hidden whitespace-nowrap rounded bg-fuchsia-500 text-center text-white transition-all"
                    role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}/>
                </div>
              </div>
            </div>
          </div>
        </div>)
      })
    )
  }, [cards])

  const handleOnClick = useCallback(() => {
    setOpenModal(true)
  }, [cards])

  return (
    <>
      <div className="flex flex-row items-center">
        <a href="/home/dashboard"><Reply width="36" height="36"/></a>
        <h1 className="ml-12">Tarjetas</h1>
      </div>
      <CreditCardsModal open={openModal} setHidden={setOpenModal} setCards={setCards} cards={cards}/>

      {cards.length <= 0 ?
        (<div className="flex justify-center items-center h-screen -my-40">
          <div className="flex flex-col">
            <h3>¡Parece que aun no tienes niguna tarjeta registrada!</h3>
            <div className="flex flex-row justify-center">
              <p>Para agregar una tarjeta, haz click en el boton de abajo</p>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleOnClick}>+ Agregar tarjeta <CreditCard/></button>
          </div>
        </div>) : (
          <div className="flex flex-col">
            <div className="flex flex-row justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleOnClick}>+ Agregar tarjeta <CreditCard/></button>
            </div>
            <div>
              {renderCards()}
            </div>
          </div>
        )
      }

    </>
  );
}

export default React.memo(CreditCards)