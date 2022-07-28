import React, {useCallback} from 'react'
import {X} from "heroicons-react";
import {getAuth} from "firebase/auth";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../../App";
import {ActiveType} from "../../pages/ActivePasive";

interface AddActiveProps {
  open: boolean
  setHidden: (isOpen: boolean) => void
  actives: ActiveType[]
  setActive: React.Dispatch<React.SetStateAction<ActiveType[]>>
}

const AddActive = ({open, setHidden, actives, setActive}: AddActiveProps) => {
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

  const handleSubmit = useCallback(async (event: any) => {
    event.preventDefault()
    const user = auth.currentUser

    try {
      if (user === null) {
        return
      }
      const newActive: ActiveType = {
        date: new Date().toISOString(),
        categorie: event.target.categorie.value,
        amount: event.target.amount.value,
        description: event.target.description.value,
        fixed_assets: false,
        name: event.target.name.value,
        quantity: event.target.quantity.value,
      }
      const actives = collection(db, 'users', user.uid, 'actives')
      await addDoc(actives, newActive).then((doc: any) => {

        const localActive: ActiveType = {
          id: doc.id,
          date: new Date().toISOString(),
          categorie: event.target.categorie.value,
          amount: event.target.amount.value,
          description: event.target.description.value,
          fixed_assets: false,
          name: event.target.name.value,
          quantity: event.target.quantity.value,
        }
        setActive((actives) => [...actives, localActive])
        handleClose()
        MySwal.fire('Exito!', 'Tu activo fue agregado con exito!', 'success')
        event.target.categorie.value = ''
        event.target.amount.value = ''
        event.target.description.value = ''
        event.target.name.value = ''
        event.target.quantity.value = ''

      })

    } catch (error) {
      MySwal.fire('Error!', 'Algo salio mal, intenta de nuevo! ' + error, 'error')
      console.log(error)
    }

  }, [])

  return (
    <div
      className={`transition justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ml-64  ${show()}`}>
      <div className="relative w-6/12 my-6 mx-auto max-w-3xl">
        <form onSubmit={handleSubmit}
              className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h4>Agregar Activo</h4>

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
                  id="name" type="text" step="0.01" placeholder="Ejemplo: Casa" name="name" required/>
              </div>
              <div className="flex flex-row gap-2">
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-2">
                    Cantidad
                  </label>
                  <input
                    className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="quantity" type="number" step="1" placeholder="Ejemplo: 12" name="quantity" required/>
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-2">
                    Categoria
                  </label>
                  <select
                    className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="categorie" name="categorie" required>
                    <option value="Salario">Salario</option>
                    <option value="Inversion">Inversion</option>
                    <option value="Inversion">Equipo</option>
                    <option value="Inversion">Moneda</option>
                    <option value="Extra">Otro</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-2">
                    Activo fijo
                  </label>
                  <input
                    className="h-4 mt-3 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="fixed_asset" type="checkbox" name="fixed_asset"/>
                </div>
              </div>
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Valor
                </label>
                <input
                  className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="amount" type="number" step="0.01" placeholder="Ejemplo: 350.50" name="amount" required/>
              </div>
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Pequeña descripción
                </label>
                <input
                  className="shadow  border rounded w-full h-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description" type="text" max="30" placeholder="Ejemplo: pago de telefono " name="description" required/>
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
export default React.memo(AddActive)