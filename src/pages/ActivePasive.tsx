import React from 'react'
import {Cash, Reply} from "heroicons-react";
import SimpleCard from "../components/Cards/SimpleCard";
import Invoices from "../components/Cards/Invoices";

const ActivePasive = () => {
 return(
   <>
     <div className="flex flex-row items-center">
       <a href="/home/dashboard"><Reply width="36" height="36"/></a>
       <h1 className="ml-12">Activos / Pasivos</h1>
     </div>
     <div className="flex flex-row mt-4 gap-4">
       <SimpleCard title="Sueldo" icon={<Cash className="text-white" />} value={18000} />
       <SimpleCard title="Inversiones" icon={<Cash className="text-white" />} value={1200} />
       <SimpleCard title="Extras" icon={<Cash className="text-white" />} value={0} />
       <button className="rounded-md border w-56 bg-gradient-fuchsia text-white shadow">+ Agregar</button>

     </div>
     <div className="flex grid grid-cols-2 gap-4 mt-4 ">
       <Invoices title="Activos" />
       <Invoices title="Pasivos" />
     </div>

   </>

 )
}

export default React.memo(ActivePasive)