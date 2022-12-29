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

type EditActiveProps ={
  globalActives: ActiveType[]
  setGlobalActive: React.Dispatch<React.SetStateAction<ActiveType[]>>
}

const EditActive = ({globalActives,setGlobalActive}:EditActiveProps) => {

  const active = useRecoilValue(selectedActive)
  const [open, setOpenEditActive] = useRecoilState(openEditActive)
  const [name, setName] = useState(active?.name)
  const [quantity, setQuantity] = useState(active?.quantity)
  const [amount, setAmount] = useState(active?.amount)
  const [description, setDescription] = useState(active?.description)
  const [category, setCategory] = useState(active?.categorie)
  const auth = getAuth()
  const user = auth.currentUser
  const MySwal = withReactContent(Swal)

  useEffect(() => {
    setName(active?.name)
    setQuantity(active?.quantity)
    setAmount(active?.amount)
    setDescription(active?.description)
    setCategory(active?.categorie)
  }, [active])

  const handleClose = useCallback(() => {
    setOpenEditActive(false)
  }, [])

  const show = () => {
    if (open) {
      return ''
    }

    return 'hidden'
  }

  const onChangeName = useCallback((event: any) => {
    setName(event.target.value)
  }, [name])

  const onChangeQuantity = useCallback((event: any) => {
    setQuantity(event.target.value)
  }, [quantity])

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
      if (user === null || active === undefined || active.id === undefined ) {
        return
      }

      const activeEdited = {
        id: active.id,
        name: name,
        quantity: quantity,
        amount: amount,
        description: description,
        categorie: category,
        date: active.date
      }

      const activesRef = doc(db, 'users', user.uid, 'actives',active.id)
      await updateDoc(activesRef,activeEdited).then((doc:any)=> {

        const updateActives = globalActives.map((local:ActiveType) =>{
          if(local.id === active.id ){
            return {...local,id:active.id, name: name, quantity: quantity, amount: amount, description: description, categorie: category,date:active.date}
          }
          return local
        })
        handleClose()
        setGlobalActive(updateActives)
        MySwal.fire('Exito!', 'Tu activo fue editad con exito!', 'success')
      })

    } catch (e) {
      console.error(e)
      MySwal.fire('Error!', 'error')

    }
  }, [name,quantity,amount,description,category])


  return (
    <div
      className={`transition justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ml-64  ${show()}`}>
      <div className="relative w-6/12 my-6 mx-auto max-w-3xl">
        <form onSubmit={handleSubmit}
              className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h4>Editar Activo {active?.name} </h4>

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
                  id="name" type="text" step="0.01" placeholder="Ejemplo: Casa" name="name" value={name} onChange={onChangeName} required/>
              </div>
              <div className="flex flex-row gap-2">
                <div>
                  <label className="text-gray-700 text-sm font-bold mb-2">
                    Cantidad
                  </label>
                  <input
                    className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="quantity" type="number" step="1" placeholder="Ejemplo: 12" name="quantity" value={quantity} onChange={onChangeQuantity} required/>
                </div>
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
              <div>
                <label className="text-gray-700 text-sm font-bold mb-2">
                  Pequeña descripción
                </label>
                <input
                  className="shadow  border rounded w-full h-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description" type="text" max="30" placeholder="Ejemplo: pago de telefono " name="description" value={description} onChange={onChangeDescription} required/>
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

export default React.memo(EditActive)
