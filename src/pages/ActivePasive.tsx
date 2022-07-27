import React, { useState} from 'react'
import {Cash, ChartSquareBar, Clipboard, Reply} from "heroicons-react";
import SimpleCard from "../components/Cards/SimpleCard";
import Pasives from "../components/Cards/Pasives";
import Actives from "../components/Cards/Actives";
import AddActive from "../components/Modals/AddActive";

export type ActiveType = {
  id?:string
  categorie: string
  amount: number
  description: string
  date: string
}

const ActivePasive = () => {

  const [openActive, setOpenActive] = useState(false);
  const [actives, setActives] = useState<ActiveType[]>([])
 return(
   <>
     <AddActive open={openActive} setHidden={setOpenActive} actives={actives} setActive={setActives} />
     <div className="flex flex-row items-center">
       <a href="/home/dashboard"><Reply width="36" height="36"/></a>
       <h1 className="ml-12">Activos / Pasivos</h1>
     </div>
     <div className="flex grid grid-cols-3 mt-4 gap-4 ">
       <SimpleCard title="Sueldo" icon={<Cash className="text-white" />} value={18000} />
       <SimpleCard title="Inversiones" icon={<ChartSquareBar className="text-white" />} value={1200} />
       <SimpleCard title="Extras" icon={<Clipboard className="text-white" />} value={0} />
     </div>
     <div className="flex grid grid-cols-2 gap-4 mt-8 ">
       <Actives setOpenActive={setOpenActive} actives={actives} setActives={setActives} />
       <Pasives />
     </div>

   </>

 )
}

export default React.memo(ActivePasive)