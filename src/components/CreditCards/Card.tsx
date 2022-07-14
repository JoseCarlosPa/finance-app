import React, {useCallback} from 'react'
import {singleCard} from "../../pages/CreditCards";
import {Pencil, Trash} from "heroicons-react";
import Swal from "sweetalert2";
import {deleteDoc, doc} from "firebase/firestore";
import {db} from "../../App";
import {getAuth} from "firebase/auth";

type CardProps = {
  card: singleCard
  setCards:  React.Dispatch<React.SetStateAction<singleCard[]>>
}

const Card = ({card,setCards}:CardProps) =>{

  const auth = getAuth()


  const handleDelete = useCallback(()=>{
    const user = auth.currentUser
    if (user === null) {
      return
    }
    Swal.fire({
      title: 'Estas seguro que deseas eliminar esta tarjeta?',
      text: "No podras recuperar la informacion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!'
    }).then(async (result) => {
      if (result.isConfirmed) {

        await deleteDoc(doc(db, "users",user.uid,"credit_cards",card.id))
        setCards(current =>
          current.filter(arr => {
            return arr.id !==card.id ;
          }))
        Swal.fire(
          'Eliminado!',
          'Tu tajeta fue eliminada con exito.',
          'success'
        )
      }
    })
  },[auth.currentUser, card.id])


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
                <h6 className="mb-0 text-white ">{card.bank}</h6>
              </div>
            </div>
            <div className="flex items-end justify-end w-1/5 ml-auto">
              <Pencil className="text-yellow-100 cursor-pointer" width="26" height="26" onClick={handleDelete}/>
              <Trash  className="text-red-600 cursor-pointer" width="26" height="26" onClick={handleDelete}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Card)