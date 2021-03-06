import React from 'react'
import ToolsCard from "../components/Cards/ToolsCard";
import {ClipboardList, ColorSwatch, OfficeBuilding, Reply, TrendingUp} from "heroicons-react";

const Tools = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center">
        <a href="/home/dashboard"><Reply width="36" height="36"/></a>
        <h1 className="ml-12">Herramientas</h1>
      </div>
      <div className="flex grid grid-cols-3 mt-4">
        <ToolsCard
          title={'Bonos'}
          description={'Podremos calcular el valor de un bono en base al valor nominal, la taza el periodo y el valor del cupon'}
          icon={<ColorSwatch className="text-white" width="64" height="64" />}
          link={'/home/calculo-de-bonos'}
        />
        <ToolsCard
          title={'Valor Futuro'}
          description={'Podremos calcular el valor de una inversion en base a la taza, el periodo y el valor de la inversion'}
          icon={<TrendingUp className="text-white" width="64" height="64" />}
          link={'/home/valor-futuro'}
        />
        <ToolsCard
          title={'Valor presente'}
          description={'Podremos calcular el valor que nesecitamos invertir para obtener el valor de una inversion'}
          icon={<ClipboardList className="text-white" width="64" height="64" />}
          link={'/home/valor-presente'}
        />

      </div>
      <div className="flex grid grid-cols-3 mt-8">
        <ToolsCard
          className="col-span-2"
          title={'Tabla de moritzacion'}
          description={'Podremos calcular el valor de un bono en base al valor nominal, la taza el periodo y el valor del cupon'}
          icon={<OfficeBuilding className="text-white" width="64" height="64" />}
          link={'/home/herramientas/calculo-bonos'}
        />
      </div>
    </div>

  )
}

export default React.memo(Tools)