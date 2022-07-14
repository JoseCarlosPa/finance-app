import React from 'react'
import {singleCard} from "../../pages/CreditCards";
import {Trash} from "heroicons-react";

type CardProps = {
  card: singleCard
}

const Card = ({card}:CardProps) =>{
  return (
    <div
      className="relative flex flex-col min-w-0 break-words bg-transparent border-0 border-transparent border-solid shadow-xl rounded-2xl bg-clip-border">
      <div className="relative overflow-hidden rounded-2xl">
                    <span
                      className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-dark-gray opacity-80"></span>
        <div className="relative z-10 flex-auto p-4">
          <i className="p-2 text-white fas fa-wifi"></i>
          <h5
            className="pb-2 mt-6 mb-12 text-white">****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;{card.card_number}</h5>
          <div className="flex">
            <div className="flex">
              <div className="mr-6">
                <p className="mb-0 leading-normal text-white text-size-sm opacity-80">Nombre</p>
                <h6 className="mb-0 text-white">{card.name}</h6>
              </div>
              <div>
                <p className="mb-0 leading-normal text-white text-size-sm opacity-80">Banco</p>
                <h6 className="mb-0 text-white text-xs">{card.bank}</h6>
              </div>
            </div>
            <div className="flex items-end justify-end w-1/5 ml-auto">
              <Trash  className="text-red-500 cursor-pointer" width="26" height="26"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Card)