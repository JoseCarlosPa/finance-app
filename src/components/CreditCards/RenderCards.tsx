import React, {useCallback} from 'react'
import Card from "./Card";
import {singleCard} from "../../pages/CreditCards";
import {CalendarOutline, CreditCard, CurrencyDollar} from "heroicons-react";

interface RenderCardsProps {
  cards: singleCard[]
  setCards: React.Dispatch<React.SetStateAction<singleCard[]>>
  setEditCard: React.Dispatch<React.SetStateAction<singleCard>>
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>
  setPayCard: React.Dispatch<React.SetStateAction<singleCard>>
  setOpenPayModal: React.Dispatch<React.SetStateAction<boolean>>
}

const RenderCards = ({cards, setCards, setEditCard, setOpenEditModal,setPayCard,setOpenPayModal}: RenderCardsProps) => {


  const getCutDate = useCallback((cut_date:string)=>{
    const month = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    const d = new Date();
    let name = month[d.getMonth()];

    return `${name} ${cut_date} `

  },[])

  const style = {border: '1px solid gray'}

  return (
    <>
      {cards.map((card, index) => {
        const payCard =()=>{
          setOpenPayModal(true)
          setPayCard(card)
        }

        return (<div className="flex grid grid-cols-6 mb-4 gap-2 ml-4" key={index}>
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
              <p className="mt-3"><CalendarOutline /> Monto a pagar en {getCutDate(card.cut_date)} </p>
            </div>
            <div className="mt-8">
              <div className="flex flex-row rounded-md  w-full h-8 justify-center items-center">
                <button className="bg-gradient-fuchsia rounded w-full text-white h-12 hover:text-gray-300" onClick={payCard}>Pagar <CreditCard /></button>
              </div>
              <div className="flex flex-row rounded-md  w-full h-8 justify-center items-cente mt-6">
                <button className="bg-gradient-fuchsia rounded w-full text-white h-12 hover:text-gray-300">Agregar Gasto <CurrencyDollar /></button>
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
