import React, {useCallback, useState} from 'react'
import {CreditCard, Reply} from "heroicons-react";
import CreditCardsModal from "../components/Modals/CreditCardsModal";

const CreditCards = () => {

  const [cards, setCards] = useState<string[]>([])
  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleOnClick = useCallback(() => {
    setOpenModal(true)
  },[])

  return (
    <>
      <div className="flex flex-row items-center">
        <a href="/home/dashboard"><Reply width="36" height="36"/></a>
        <h1 className="ml-12">Tarjetas</h1>
      </div>
      <CreditCardsModal open={openModal} setHidden={setOpenModal}/>

      {cards.length <= 0 &&
        <div className="flex justify-center items-center h-screen -my-40">
          <div className="flex flex-col">
            <h3>¡Parece que aun no tienes niguna tarjeta registrada!</h3>
            <div className="flex flex-row justify-center">
              <p>Para agregar una tarjeta, haz click en el boton de abajo</p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleOnClick}>+ Agregar tarjeta <CreditCard /></button>
          </div>
        </div>
      }

    </>
  );
}

export default React.memo(CreditCards)