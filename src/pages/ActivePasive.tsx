import React from 'react'
import {Reply} from "heroicons-react";

const ActivePasive = () => {
 return(
   <div className="flex flex-row items-center">
     <a href="/home/dashboard"><Reply width="36" height="36"/></a>
     <h1 className="ml-12">Activos / Pasivos</h1>
   </div>
 )
}

export default React.memo(ActivePasive)