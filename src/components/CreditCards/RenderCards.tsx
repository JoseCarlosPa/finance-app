import React, {useCallback} from 'react'
import {singleCard} from "../../pages/CreditCards";
import CardAnalytics from "./CardAnalytics";

interface RenderCardsProps {
  cards: singleCard[]
  setCards: React.Dispatch<React.SetStateAction<singleCard[]>>
  setEditCard: React.Dispatch<React.SetStateAction<singleCard>>
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>
}

const RenderCards = (
  {
    cards,
    setCards,
    setEditCard,
    setOpenEditModal,
  }: RenderCardsProps) => {

  return (
    <>
      {cards.map((card, index) => {
        return (
          <CardAnalytics
            key={index}
            card={card}
            setCards={setCards}
            setEditCard={setEditCard}
            setOpenEditModal={setOpenEditModal}
          />
        )
      })
      }
    </>
  );
}

export default React.memo(RenderCards)
