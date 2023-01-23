import React, {useCallback, useEffect, useState} from 'react'
import {X} from "heroicons-react";
import {addDoc, collection, doc, getDoc, getDocs, query, updateDoc} from "firebase/firestore";
import {db} from "../../App";
import {getAuth} from "firebase/auth";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {IncomeType} from "../../pages/Bills";
import {singleCard} from "../../pages/CreditCards";

interface AddOutcomeProps {
  open: boolean
  setHidden: (isOpen: boolean) => void
  outcomes: any
  setOutcome: React.Dispatch<React.SetStateAction<IncomeType[]>>
}

const AddOutcome = ({open, setHidden, outcomes, setOutcome}: AddOutcomeProps) => {
  const auth = getAuth()
  const user = auth.currentUser
  const MySwal = withReactContent(Swal)
  const [showSelect, setShowSelect] = useState(false)
  const [selectOther, setSelectOther] = useState<boolean>(false)
  const [showCreditCards, setShowCreditCards] = useState(false)
  const [activeCards, setActiveCards] = useState<singleCard[]>([])

  const show = () => {
    if (open) {
      return ''
    }

    return 'hidden'
  }

  const handleClose = () => {
    setHidden(false)
  }


  const handleSubmit = useCallback(async (event: any) => {
    event.preventDefault()

    try {
      if (user === null) {
        return
      }

      const newActive: IncomeType = {
        date: new Date(event.target.date.value),
        categorie: selectOther ? event.target.categorie_other.value : event.target.categorie.value,
        amount: event.target.amount.value,
        description: event.target.description.value,
        name: event.target.name.value,
        period: event.target.period ? event.target.period.value : "N/A",
        startDate: event.target.startDate ? event.target.startDate.value : "N/A",
        creditCard: showCreditCards ? event.target.creditCard.value : "N/A"
      }
      const outcomes = collection(db, 'users', user.uid, 'outcomes')
      await addDoc(outcomes, newActive).then(async (out: any) => {

        const localActive: IncomeType = {
          id: out.id,
          date: event.target.date.value,
          categorie: selectOther ? event.target.categorie_other.value : event.target.categorie.value,
          amount: event.target.amount.value,
          description: event.target.description.value,
          name: event.target.name.value,
          period: event.target.period ? event.target.period.value : "N/A",
          startDate: event.target.startDate ? event.target.startDate.value : "N/A",
          creditCard: showCreditCards ? event.target.creditCard.value : "N/A"
        }
        setOutcome((outcomes) => [...outcomes, localActive])



        if(showCreditCards){
          const creditCardsRef = doc(db, 'users', user.uid, 'credit_cards', event.target.creditCard.value)
          const docSnap = await getDoc(creditCardsRef);
          if(event.target.categorie.value == "tarjetas"){
            await updateDoc(creditCardsRef,{used_balance: parseInt(docSnap.data()!.used_balance) - parseInt(event.target.amount.value)}).catch((error) => {
              console.error(error)
            })
          }else{
            await updateDoc(creditCardsRef,{used_balance: parseInt(docSnap.data()!.used_balance) + parseInt(event.target.amount.value)}).catch((error) => {
              console.error(error)
            })
          }

        }

        handleClose()
        MySwal.fire('Exito!', 'Tu egreso fue agregado con exito!', 'success')
        event.target.categorie.value = ''
        event.target.amount.value = ''
        event.target.description.value = ''
        event.target.name.value = ''
        if (event.target.period) {
          event.target.period.value = ''
        }
        if (event.target.startDate) {
          event.target.startDate.value = ''
        }
      })

    } catch (error) {
      MySwal.fire('Error!', 'Algo salio mal, intenta de nuevo! ' + error, 'error')
      console.error(error)
    }

  }, [selectOther,user,showCreditCards])

  const handleShowSelect = useCallback(() => {
    setShowSelect(!showSelect)
  }, [showSelect])

  const handleSelectOther = useCallback((event: any) => {
    if (event.target.value === "Otro") {
      setSelectOther(true)
    } else {
      setSelectOther(false)
    }

  }, [])

  const handleShowCards = useCallback(() => {
    setShowCreditCards(!showCreditCards)
  },[showCreditCards])


  const getCreditCards = useCallback(async () => {
    if (user === null) {
      return
    }
    const creditCards = collection(db, 'users', user.uid, 'credit_cards')
    const snap = query(creditCards)
    const querySnapshot = await getDocs(snap)
    return querySnapshot.docs.map((doc) => {
      const isCard = {
        id: doc.id,
        name: doc.data().name,
        bank: doc.data().bank,
        card_number: doc.data().card_number,
        max_balance: doc.data().max_balance,
        used_balance: doc.data().used_balance,
        cut_date: doc.data().cut_date

      }
      setActiveCards((cards) => [...cards, isCard])
    })
  },[user])

  useEffect(() => {
    getCreditCards()
  },[getCreditCards])

  return (
    <div
      className={`transition justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ml-64  ${show()}`}>
      <div className="relative w-4/12 my-6 mx-auto max-w-3xl">
        <form onSubmit={handleSubmit}
              className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h4>Agregar Egresos</h4>

            <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={handleClose}
            >
              <X/>
            </button>
          </div>

          <div className="p-6">
            <div className="flex flex-col gap-2">
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Nombre
                </label>
                <input
                  className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name" type="text" step="0.01" placeholder="Ejemplo: LeadSales" name="name" required/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-2">
                    Categoria
                  </label>
                  <select
                    className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="categorie" name="categorie" onChange={handleSelectOther} required>
                    <option value="Servicios">Servicios</option>
                    <option value="Suscripciones">Suscripciones</option>
                    <option value="Entretenimiento">Entretenimiento</option>
                    <option value="Comida">Comida</option>
                    <option value="tarjetas">Pago de tarjeta de credito</option>
                    <option value="Otro">Otro</option>
                  </select>

                  {selectOther && (
                    <div>
                      <label className="text-gray-700 text-sm font-bold mb-2">
                        Categoria
                      </label>
                      <input name="categorie_other" id="categorie_other" type="text"
                             className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-2">
                    Fecha
                  </label>
                  <input type="datetime-local" name="date" className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required/>
                </div>
              </div>

              <div className="mt-4 hidden">
                <div className="flex items-center mb-4">

                  <label htmlFor="default-checkbox"
                         className="ml-2 text-sm font-medium text-gray-900">¿Es recurrente?</label>
                  <input id="default-checkbox" type="checkbox" value="1"
                         className="ml-4 w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                         onClick={handleShowSelect}/>
                </div>
              </div>
              {showSelect && (
                <div>
                  <div>
                    <label className="text-gray-700 text-sm font-bold mb-2">
                      Periodo
                    </label>
                    <select
                      className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="period" name="period" required>
                      <option value="7">Cada 7 días</option>
                      <option value="15">Cada 15 días</option>
                      <option value="30">Cada 30 días</option>
                      <option value="60">Cada 60 días</option>
                      <option value="90">Cada 90 días</option>
                      <option value="180">Cada 180 días</option>
                      <option value="180">Cada 365 días</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-700 text-sm font-bold mb-2">
                      Fecha de inicio
                    </label>
                    <input
                      className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="startDate" type="number" step="1" min="1" max="31"
                      placeholder="Ejemplo: Empieza a contar desde el 1ro de Cada Mes" name="startDate" required/>
                  </div>
                </div>
              )}
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  $ Monto
                </label>
                <input
                  className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="amount" type="number" step="0.01" placeholder="Ejemplo: 350.50" name="amount" required/>
              </div>
              <div className="flex  mt-4 w-full h-full items-center align-middle">
                <label htmlFor="default-checkbox"
                       className="ml-2 text-sm font-medium text-gray-900">¿Asociar con tarjeta de credito?</label>
                <input id="default-checkbox" type="checkbox" value="1"
                       className="ml-4 w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                       onClick={handleShowCards}/>
              </div>
              {showCreditCards && (
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-2">
                    Tarjeta
                  </label>
                  <select name="creditCard" id="creditCard" className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    {activeCards.map((card,index) => (
                      <option value={card.id} key={index}>{card.name}</option>
                    ))}
                  </select>

                </div>
              )}
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Pequeña descripción
                </label>
                <input
                  className="shadow  border rounded w-full h-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description" type="text" max="30" placeholder="Ejemplo: pago de telefono " name="description"/>
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
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default React.memo(AddOutcome)