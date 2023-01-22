import React, {useCallback, useEffect, useState} from 'react'
import {Cash, CreditCard, CurrencyDollar, Reply} from "heroicons-react";
import CreditCardsModal from "../components/Modals/CreditCardsModal";
import {collection, query, getDocs, orderBy,doc,getDoc} from "firebase/firestore";
import {db} from "../App";
import {getAuth} from "firebase/auth";
import CreditCardEdit from "../components/Modals/CreditCardEdit";
import Incomes from "../components/Cards/Incomes";
import RenderCards from "../components/CreditCards/RenderCards";
import PayCreditCard from "../components/Modals/PayCreditCard";

export type singleCard = {
  id: string
  name: string
  bank: string
  card_number: string
  max_balance: string
  used_balance: string
  cut_date: string
}

const CreditCards = () => {

  const emptyCard = {
    id: '',
    name: '',
    bank: '',
    card_number: '',
    max_balance: '',
    used_balance: '',
    cut_date: ''
  }
  const [cards, setCards] = useState<singleCard[]>([])
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [opePayModal, setOpenPayModal] = useState<boolean>(false)

  const [userData, setUserData] = useState<any>({})
  const [editCard, setEditCard] = useState<singleCard>(emptyCard)
  const [payCard, setPayCard] = useState<singleCard>(emptyCard)
  const [availableBalance, setAvailableBalance] = useState<number>(0)
  const [debt, setDebt] = useState<number>(0)

  const auth = getAuth()

  const getCreditCards = useCallback(async () => {
    const user = auth.currentUser
    if (user === null) {
      return
    }
    setCards([])
    const creditCardsArray = query(collection(db, "users", user.uid, "credit_cards"), orderBy('name', 'asc'))
    const querySnapshot = await getDocs(creditCardsArray);
    querySnapshot.forEach((doc) => {
      const isCard = {
        id: doc.id,
        name: doc.data().name,
        bank: doc.data().bank,
        card_number: doc.data().card_number,
        max_balance: doc.data().max_balance,
        used_balance: doc.data().used_balance,
        cut_date: doc.data().cut_date

      }
      setCards(cards => [...cards, isCard])
    });
  }, [auth.currentUser])

    const getUserData = useCallback(async () => {
    const user = auth.currentUser
    if (user === null) {
      return
    }
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return
    }
    setUserData(docSnap.data())

  },[auth.currentUser])


  useEffect(() => {
      getUserData().then()
      getCreditCards().then()
  }, [getCreditCards])

  useEffect(() => {
    setAvailableBalance(0)
    setDebt(0)
    cards.forEach((card) => {
      setAvailableBalance(availableBalance => availableBalance + (Number(card.max_balance) - Number(card.used_balance)))
      setDebt(debt => debt + (Number(card.used_balance)))
    })
  }, [cards])

  const handleOnClick = useCallback(() => {
    setOpenModal(true)
  }, [cards])

  const calculatePercentage = useCallback(() => {
    const percentage = (debt * 100 /userData.global_debt )
    return percentage.toFixed(2)
  },[debt,userData])

  return (
    <>
      <div className="flex flex-row items-center">
        <a href="/home/dashboard"><Reply width="36" height="36"/></a>
        <h1 className="ml-12">Tarjetas</h1>
      </div>

      {cards.length <= 0 ?
        (<div className="flex justify-center items-center h-screen -my-40">
          <div className="flex flex-col">
            <h3>¡Parece que aun no tienes niguna tarjeta registrada!</h3>
            <div className="flex flex-row justify-center">
              <p>Para agregar una tarjeta, haz click en el boton de abajo</p>
            </div>
            <button
              className="bg-gradient-fuchsia hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleOnClick}>+ Agregar tarjeta <CreditCard/></button>
          </div>
        </div>) : (
          <div className="flex flex-col">
            <div className="flex flex-row justify-end mr-4">
              <button
                className="bg-gradient-fuchsia hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleOnClick}>+ Agregar tarjeta <CreditCard/></button>
            </div>
            <div className="flex grid grid-cols-4 justify-center items-center mb-4 mt-4">
              <Incomes total={availableBalance} icon={<CreditCard className="text-white" width="32" height="32"/>}
                       title={'Disponible'} subtitle={'Sobrante total'}/>
              <Incomes total={debt} icon={<CurrencyDollar className="text-white" width="32" height="32"/>}
                       title={'Deuda'} subtitle={'Deuda total'}/>
              <Incomes total={userData.global_income} icon={<Cash className="text-white" width="32" height="32"/>}
                       title={'Activos'} subtitle={'Activos Globales'}/>
              <Incomes total={calculatePercentage()} icon={<Cash className="text-white" width="32" height="32"/>}
                       title={'Porcentaje'} subtitle={'% con respecto a deuda global'} percentage/>

            </div>
            <div>
              <RenderCards cards={cards} setCards={setCards} setEditCard={setEditCard} setOpenEditModal={setOpenEditModal} setPayCard={setPayCard} setOpenPayModal={setOpenPayModal}/>
            </div>
          </div>
        )
      }
      <CreditCardsModal open={openModal} setHidden={setOpenModal} setCards={setCards}/>
      <CreditCardEdit open={openEditModal} setHidden={setOpenEditModal} card={editCard} cards={cards} setCards={setCards}/>
      <PayCreditCard card={payCard} open={opePayModal} setHidden={setOpenPayModal} cards={cards} setCards={setCards}/>
    </>
  );
}

export default React.memo(CreditCards)