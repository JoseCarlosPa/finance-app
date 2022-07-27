import React, {useCallback, useState,Suspense} from 'react'
import {Cash, ChartSquareBar, Clipboard, Reply} from "heroicons-react";
import SimpleCard from "../components/Cards/SimpleCard";
import AddActive from "../components/Modals/AddActive";

const Actives = React.lazy(() => import('../components/Cards/Actives'));
const Pasives = React.lazy(() => import('../components/Cards/Pasives'));

export type ActiveType = {
  id?: string
  categorie: string
  amount: number
  description: string
  date: string
}

const ActivePasive = () => {

  const [openActive, setOpenActive] = useState(false);
  const [actives, setActives] = useState<ActiveType[]>([])

  const calculateTotalActives = useCallback(() => {
    let total: number = 0
    actives.forEach((active) => {
        total += Number(active.amount)
      }
    )
    return total
  }, [actives])

  return (
    <>
      <AddActive open={openActive} setHidden={setOpenActive} actives={actives} setActive={setActives}/>
      <div className="flex flex-row items-center">
        <a href="/home/dashboard"><Reply width="36" height="36"/></a>
        <h1 className="ml-12">Activos / Pasivos</h1>
      </div>
      <div className="flex grid grid-cols-3 mt-4 gap-4 ">
        <SimpleCard title="Activos" icon={<Cash className="text-white"/>} value={calculateTotalActives()}/>
        <SimpleCard title="Pasivos" icon={<ChartSquareBar className="text-white"/>} value={1200}/>
        <SimpleCard title="Extras" icon={<Clipboard className="text-white"/>} value={0}/>
      </div>
      <div className="flex grid grid-cols-2 gap-4 mt-8 ">
        <Suspense fallback={<div>Loading...</div>}>
          <Actives setOpenActive={setOpenActive} actives={actives} setActives={setActives}/>
        </Suspense>
        <Pasives/>
      </div>

    </>

  )
}

export default React.memo(ActivePasive)