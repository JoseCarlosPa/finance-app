import React, {useCallback, useEffect, useState} from 'react'
import {ActiveType} from "../../pages/ActivePasive";
import {X} from "heroicons-react";
import {useRecoilState, useRecoilValue} from "recoil";
import {openEditActive, selectedActive} from "../../store/recoil/Active";
import {addDoc, collection, doc, updateDoc} from "firebase/firestore";
import {db} from "../../App";
import {getAuth} from "firebase/auth";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {openEditPassive, selectedPassive} from "../../store/recoil/Pasive";

type EditActiveProps ={
  globalPassives: ActiveType[]
  setGlobalPassives: React.Dispatch<React.SetStateAction<ActiveType[]>>
}

const EditPasive = ({globalPassives,setGlobalPassives}:EditActiveProps) => {

  const passive = useRecoilValue(selectedPassive)
  const [open, setOpenEditpasive] = useRecoilState(openEditPassive)
  const [amount, setAmount] = useState(passive?.amount)
  const [description, setDescription] = useState(passive?.description)
  const [category, setCategory] = useState(passive?.categorie)
  const auth = getAuth()
  const user = auth.currentUser
  const MySwal = withReactContent(Swal)

  useEffect(() => {
    setAmount(passive?.amount)
    setDescription(passive?.description)
    setCategory(passive?.categorie)
  }, [passive])

  const handleClose = useCallback(() => {
    setOpenEditpasive(false)
  }, [])

  const show = () => {
    if (open) {
      return ''
    }

    return 'hidden'
  }

  const onChangeAmount = useCallback((event: any) => {
    setAmount(event.target.value)
  }, [amount])

  const onChangeDescription = useCallback((event: any) => {
    setDescription(event.target.value)
  }, [description])

  const onChangeCategory = useCallback((event: any) => {
    setCategory(event.target.value)
  }, [category])

  // Update the active
  const handleSubmit = useCallback(async (event: any) => {
    event.preventDefault()
    try {
      if (user === null || passive === undefined || passive.id === undefined ) {
        return
      }

      const activeEdited = {
        id: passive.id,
        amount: amount,
        description: description,
        categorie: category,
        date: passive.date
      }

      const activesRef = doc(db, 'users', user.uid, 'pasives',passive.id)
      await updateDoc(activesRef,activeEdited).then((doc:any)=> {

        const updatePassive = globalPassives.map((local:ActiveType) =>{
          if(local.id === passive.id ){
            return {...local,id:passive.id,  amount: amount, description: description, categorie: category,date:passive.date}
          }
          return local
        })
        handleClose()
        setGlobalPassives(updatePassive)
        MySwal.fire('Exito!', 'Tu pasivo fue editad con exito!', 'success')
      })

    } catch (e) {
      console.error(e)
      MySwal.fire('Error!', 'error')

    }
  }, [amount,description,category])


  return (
    <div
      className={`transition justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ml-64  ${show()}`}>
      <div className="relative w-6/12 my-6 mx-auto max-w-3xl">
        <form onSubmit={handleSubmit}
              className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h4>Editar Pasivo {passive?.description} </h4>

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
                  Descripcion
                </label>
                <input
                  className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name" type="text" step="0.01" placeholder="Ejemplo: Casa" name="name" value={description} onChange={onChangeDescription} required/>
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-2">
                    Categoria
                  </label>
                  <select
                    className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="categorie" name="categorie" value={category} onChange={onChangeCategory} required>
                    <option value="Salario">Salario</option>
                    <option value="Inversion">Inversion</option>
                    <option value="Inversion">Equipo</option>
                    <option value="Inversion">Moneda</option>
                    <option value="Extra">Otro</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Valor
                </label>
                <input
                  className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="amount" type="number" step="0.01" placeholder="Ejemplo: 350.50" name="amount" value={amount} onChange={onChangeAmount} required/>
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
              Editar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default React.memo(EditPasive)
