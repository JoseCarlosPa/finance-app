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
  pasives: ActiveType[]
  setPassive:  React.Dispatch<React.SetStateAction<ActiveType[]>>
}

const AddPasive = ({open,setHidden,pasives,setPassive}:AddActiveProps) => {
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

  const handleSubmit = useCallback(async(event:any)=>{
    event.preventDefault()
    const user = auth.currentUser

    try {
      if (user === null) {
        return
      }

      const newActive : ActiveType = {
        date: new Date().toISOString(),
        categorie: event.target.categorie.value,
        amount: event.target.amount.value,
        description: event.target.description.value,
      }
      const pasives = collection(db,'users',user.uid,'pasives')
      await addDoc(pasives,newActive).then((doc:any)=>{

        const localActive: ActiveType = {
          id: doc.id,
          date: new Date().toISOString(),
          categorie: event.target.categorie.value,
          amount: event.target.amount.value,
          description: event.target.description.value,
        }
        setPassive((pasives) =>[...pasives,localActive])
        handleClose()
        MySwal.fire('Exito!', 'Tu pasivo fue agregado con exito!', 'success')
        event.target.categorie.value = ''
        event.target.amount.value = ''
        event.target.description.value = ''

      })

    } catch (error) {
      console.error(error)
    }

  },[])

  return(
    <div className={`transition justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ml-64  ${show()}`}>
      <div className="relative w-4/12 my-6 mx-auto max-w-3xl">
        <form onSubmit={handleSubmit}
              className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h4>Agregar Pasivo</h4>

            <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={handleClose}
            >
              <X/>
            </button>
          </div>

          <div className="p-6">
            <div className="flex flex-col">
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  $ Cantidad
                </label>
                <input
                  className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="amount" type="number" step="0.01" placeholder="Ejemplo: 350.50" name="amount" required/>
              </div>
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Descripción
                </label>
                <input
                  className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description" type="text"  placeholder="Ejemplo: pago de telefono " name="description" required/>
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
                  <option value="Extra">Extra</option>
                </select>
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
export default React.memo(AddPasive)