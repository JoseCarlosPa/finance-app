import React, {useCallback, useState, Suspense, useEffect} from 'react'
import {Cash, ChartSquareBar, Clipboard, Reply} from "heroicons-react";
import SimpleCard from "../components/Cards/SimpleCard";
import AddActive from "../components/Modals/AddActive";
import {getAuth} from "firebase/auth";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../App";
import AddPasive from "../components/Modals/AddPasive";
import EditActive from "../components/Modals/EditActive";
import EditPasive from "../components/Modals/EditPasive";

const Actives = React.lazy(() => import('../components/Cards/Actives'));
const Passives = React.lazy(() => import('../components/Cards/Pasives'));

export type ActiveType = {
  id?: string
  name?: string
  quantity?: number
  fixed_assets?: boolean
  categorie?: string
  amount?: number
  description?: string
  date?: string
}

const ActivePasive = () => {
  const auth = getAuth()

  const [openActive, setOpenActive] = useState(false);
  const [openPassive, setOpenPassive] = useState(false);

  const [actives, setActives] = useState<ActiveType[]>([])
  const [passives, setPassives] = useState<ActiveType[]>([])

  const [openEditActive, setOpenEditActive] = useState(false)

  const [totalActive, setTotalActives] = useState<number>(0)
  const [totalDebt, setTotalDebt] = useState<number>(0)

  const user = auth.currentUser

  const calculateTotalActives = useCallback(() => {
    let total: number = 0
    actives.forEach((active) => {

        if(active.quantity !== undefined && active.amount !== undefined && active.quantity > 1){
          const multiply = active.amount * active.quantity
          total += Number(multiply)
        }else{
          total += Number(active.amount)
        }
      }
    )
    setTotalActives(total)

  }, [actives])


  const overWriteGlobalIncome = useCallback(async () => {
    if (user !== null) {
      const userDataRef = doc(db, 'users', user.uid)
      await updateDoc(userDataRef, {global_income: totalActive}).then((doc: any) => {
      })
    }
  }, [totalActive, actives, user])

  const overWriteGlobalDebt = useCallback(async () => {
    if (user !== null) {
      const userDataRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(userDataRef);
      if (docSnap.exists()) {
        if (docSnap.data()?.global_debt === totalDebt) {
          return
        }
      }
      await updateDoc(userDataRef, {global_debt: totalDebt}).then((doc: any) => {
      })
    }
  }, [totalDebt, passives, user])

  const calculateTotalPassives = useCallback(() => {
    let total: number = 0
    passives.forEach((passive) => {
        total += Number(passive.amount)
      }
    )
    setTotalDebt(total)

  }, [passives, user, totalDebt])

  useEffect(() => {
    overWriteGlobalIncome().then()
    calculateTotalActives()
    overWriteGlobalDebt().then()
    calculateTotalPassives()

  }, [totalDebt, passives, actives, user])


  return (
    <>
      <AddActive open={openActive} setHidden={setOpenActive} actives={actives} setActive={setActives}/>
      <AddPasive open={openPassive} setHidden={setOpenPassive} pasives={passives} setPassive={setPassives}/>
      <EditActive globalActives={actives} setGlobalActive={setActives}/>
      <EditPasive globalPassives={passives} setGlobalPassives={setPassives}/>

      <div className="flex flex-row items-center">
        <a href="/home/dashboard"><Reply width="36" height="36"/></a>
        <h1 className="ml-12">Activos / Pasivos</h1>
      </div>
      <div className="flex grid grid-cols-3 mt-4 gap-4 ">
        <SimpleCard title="Activos" icon={<Cash className="text-white"/>} value={totalActive}/>
        <SimpleCard title="Pasivos" color={'bg-red-500'} icon={<ChartSquareBar className="text-white"/>}
                    value={totalDebt}/>
        <SimpleCard title="Extras" icon={<Clipboard className="text-white"/>} value={0}/>
      </div>
      <div className="flex grid grid-cols-2 gap-4 mt-8 ">
        <Suspense fallback={<div>Loading...</div>}>
          <Actives setOpenActive={setOpenActive} actives={actives} setActives={setActives}/>
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Passives setOpenActive={setOpenPassive} passives={passives} setPassives={setPassives}/>
        </Suspense>
      </div>

    </>

  )
}

export default React.memo(ActivePasive)