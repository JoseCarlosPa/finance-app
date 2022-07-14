import React, {useCallback} from 'react'
import {CreditCard, X} from "heroicons-react";
import {collection, doc, setDoc,addDoc} from "firebase/firestore";
import {db} from "../../App";
import {getAuth} from "firebase/auth";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

interface CreditCardsModalProps {
  open: boolean
  setHidden: (isOpen: boolean) => void
}

const CreditCardsModal = ({open, setHidden}: CreditCardsModalProps) => {
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
  
  const handleSubmit = useCallback(async (event:any) => {
    event.preventDefault()
    const user = auth.currentUser
    // Add to the user the credit card
    try{
      if(user === null){
        return
      }

      const creditCards = {
        name: event.target.name.value,
        bank: event.target.bank.value,
        card_number: event.target.card_number.value,
        max_balance: event.target.max_balance.value,
        used_balance: event.target.used_balance.value,

      }
      // create a new collection and save the credit card
      const creditCardsRef = collection(db,'users',user.uid,'credit_cards')
      await addDoc(creditCardsRef,creditCards)

      setHidden(false)
      MySwal.fire('Exito!',
        'Tu tarjeta fue guardada con exito!',
        'success').then(() => {
      })

    }catch (error){
      setHidden(false)
      MySwal.fire('ERROR!',
        `${error}`,
        'error').then(() => {
      })
    }

    event.target.name.value =''
    event.target.bank.value = ''
    event.target.card_number.value = ''
    event.target.max_balance.value = ''
    event.target.used_balance.value = ''

  }, [])

  return (
    <div
      className={` transition justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ml-64 ${show()}`}
    >
      <div className="relative w-full my-6 mx-auto max-w-3xl">
        {/*content*/}
        <form onSubmit={handleSubmit}
          className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-3xl font-semibold">
              Nueva Tarjeta <CreditCard/>
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
              <div className="flex grid grid-cols-2 gap-2">
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-2">
                    Nombre de la tarjeta
                  </label>
                  <input
                    className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name" type="text" placeholder="Ejemplo: Juan Díaz" name="name" required/>
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-2">
                    Banco
                  </label>
                  <select
                    required
                    name="bank"
                    className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option>BBVA bancomer</option>
                    <option>CitiBanamex</option>
                    <option>Banorte</option>

                  </select>
                </div>
              </div>

              <div className="flex grid grid-cols-3 gap-2 ">
                <div className="col-span-1 flex flex-col">
                  <label className="text-gray-700 text-sm font-bold mb-2 mt-4">
                    Ultimos 4 digitos de la tarjeta
                  </label>
                  <input
                    name="card_number"
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="card_number" type="tel" max="4" min="0" placeholder="*** **** ****"/>

                </div>
                <div className="col-span-1 flex flex-col">
                  <label className="text-gray-700 text-sm font-bold mb-2 mt-4">
                    Saldo Maximo
                  </label>
                  <input
                    required
                    name="max_balance"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="max" type="number" min="0" placeholder="Ejemplo: 20,000"/>

                </div>
                <div className="col-span-1 flex flex-col">
                  <label className="text-gray-700 text-sm font-bold mb-2 mt-4">
                    Saldo Usado
                  </label>
                  <input
                    required
                    name="used_balance"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="used" type="number" placeholder="Ejemplo: 3,750.54"/>

                </div>
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
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default React.memo(CreditCardsModal)