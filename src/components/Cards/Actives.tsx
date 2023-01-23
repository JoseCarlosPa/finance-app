import React, {useCallback, useEffect} from 'react'
import {collection, deleteDoc, doc, getDocs, orderBy, query} from "firebase/firestore";
import {db} from "../../App";
import {getAuth} from "firebase/auth";
import {ActiveType} from "../../pages/ActivePasive";
import {Pencil, Trash} from "heroicons-react";
import Swal from "sweetalert2";
import {useSetRecoilState} from "recoil";
import {openEditActive, selectedActive} from "../../store/recoil/Active";

interface ActivesProps {
  setOpenActive: React.Dispatch<React.SetStateAction<boolean>>
  setActives: React.Dispatch<React.SetStateAction<ActiveType[]>>
  actives: ActiveType[]
}

const Actives = ({setOpenActive,setActives,actives}:ActivesProps) => {
  const auth = getAuth()
  const setEditActiveOpen = useSetRecoilState(openEditActive)
  const setSelectedActive = useSetRecoilState(selectedActive)

  const getActivesData = useCallback(async () => {
    const user = auth.currentUser
    if (user === null) {
      return
    }
    setActives([])
    const activesArray = query(collection(db, "users", user.uid, "actives"), orderBy('date', 'asc'))
    const querySnapshot = await getDocs(activesArray);
    querySnapshot.forEach((doc) => {
      const isActive = {
        id: doc.id,
        name: doc.data().name,
        categorie: doc.data().categorie,
        amount: doc.data().amount,
        description: doc.data().description,
        date: doc.data().date,
        quantity: doc.data().quantity,
        fixed_assets: doc.data().fixed_assets,
      }
      setActives(actives => [...actives, isActive])
    });

  },[auth.currentUser])

  useEffect(() => {
      getActivesData().then()
  }, [getActivesData])


  const handleOpenActive = useCallback(()=>{
    setOpenActive(true)
  },[setOpenActive])
  return (
    <div className="w-full max-w-full px-3 lg:flex-none min:h-96">
      <div
        className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
        <div className="p-4 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
          <div className="flex flex-wrap -mx-3">
            <div className="flex items-center flex-none w-1/2 max-w-full px-3">
              <h6 className="mb-0">Activos </h6>
            </div>
            <div className="flex-none w-1/2 max-w-full px-3 text-right">
              <button
                onClick={handleOpenActive}
                className="inline-block px-8 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-size-xs bg-150 active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 border-blue-500 text-blue-500 hover:opacity-75"> + Agregar
              </button>
            </div>
          </div>
        </div>
        <div className="flex-auto p-4 pb-0">
          <ul className="flex flex-col pl-0 mb-0 rounded-lg">
            {actives.map((active, index) => {

              const handleEdit = () => {
                setSelectedActive(active)
                setEditActiveOpen(true)
              }

              const handleDelete = ()=>{
                const user = auth.currentUser
                if (user === null) {
                  return
                }
                Swal.fire({
                  title: 'Estas seguro que deseas eliminar este activo?',
                  text: "No podras recuperar la informacion!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#e12525',
                  cancelButtonColor: '#d3d3d3',
                  confirmButtonText: 'Si, eliminalo!'
                }).then(async (result) => {
                  if (result.isConfirmed) {

                    if(active.id === undefined){
                      return
                    }
                    await deleteDoc(doc(db, "users",user.uid,"actives",active.id)).then(()=>{
                      setActives(current =>
                        current.filter(arr => {
                          return arr.id !==active.id ;
                        }))
                      Swal.fire(
                        'Eliminado!',
                        'Tu activo fue eliminado con exito.',
                        'success'
                      )
                    }).catch(()=>{
                      Swal.fire(
                        'Error!',
                        'No se pudo eliminar el activo.',
                        'error'
                      )
                    })
                  }
                })
              }

              return(
                <li
                  key={index}
                  className="relative flex justify-between items-center px-4 py-2 pl-0 mb-2 bg-white border-0 rounded-t-inherit text-size-inherit rounded-xl">
                  <div className="flex flex-col ">
                    <h6 className="mb-1 font-semibold leading-normal text-size-sm text-slate-700">{active.name} {active.quantity && active.quantity > 1 ? '('+active.quantity+')' : ''}</h6>
                    <span className="text-xs text-gray-600 text-ellipsis overflow-hidden mr-2">{active.description}</span>
                  </div>
                  <div className="flex flex-rowitems-center leading-normal text-size-sm">
                    $ {active.quantity && active.quantity  > 1 ? (Number(active.amount!*active.quantity)).toLocaleString() :(Number(active.amount)).toLocaleString()}
                    <Pencil className="ml-2 text-yellow-500 cursor-pointer" size={16}  onClick={handleEdit}/>
                    <Trash className="ml-2 text-red-500 cursor-pointer" size={16} onClick={handleDelete}/>
                  </div>
                </li>
              )
            })}

          </ul>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Actives)