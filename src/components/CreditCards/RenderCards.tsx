import React from 'react'
import Card from "./Card";
import {singleCard} from "../../pages/CreditCards";

interface RenderCardsProps {
  cards: singleCard[]
  setCards: React.Dispatch<React.SetStateAction<singleCard[]>>
  setEditCard: React.Dispatch<React.SetStateAction<singleCard>>
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>
}

const RenderCards = ({cards, setCards, setEditCard, setOpenEditModal}: RenderCardsProps) => {

  return (
    <>
      {cards.map((card, index) => {
        return (<div className="flex grid grid-cols-6 mb-4 gap-2" key={index}>
          <div className="col-span-2">
            <Card card={card} setCards={setCards} setEditCard={setEditCard} setOpenEditModal={setOpenEditModal}/>
          </div>
          <div className="flex flex-col col-span-2 ">
            <div className="flex flex-row w-full justify-center rounded-md" style={{border: '1px solid gray'}}>
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
            <div className=" flex flex-col items-center justify-center items-center">
              <span
                className="mr-2 font-semibold leading-tight text-size-xs">{((Number(card.used_balance) * 100) / Number(card.max_balance)).toFixed(2)}%</span>
              <div className="w-full h-4 mb-4 bg-gray-200 rounded-full dark:bg-gray-700">
                <div className="h-4 bg-blue-600 rounded-full bg-gradient-fuchsia"
                     style={{width: `${(Number(card.used_balance) * 100) / Number(card.max_balance)}%`}}></div>
              </div>
            </div>
          </div>
        </div>)
        })
      }
    </>
  );
}

export default React.memo(RenderCards)
