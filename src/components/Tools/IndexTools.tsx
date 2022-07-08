import React from 'react'
import ToolsCard from "../Cards/ToolsCard";
import {ClipboardList, ColorSwatch, OfficeBuilding, TrendingUp} from "heroicons-react";

const IndexTools = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <ToolsCard
          title={'Cálculo de Bonos'}
          description={'Podremos calcular el valor de un bono en base al valor nominal, la taza el periodo y el valor del cupon'}
          icon={<ColorSwatch className="text-white" width="64" height="64" />}
          link={'/home/herramientas/calculo-bonos'}
        />
        <ToolsCard
          title={'Valor Futuro'}
          description={'Podremos calcular el valor de un bono en base al valor nominal, la taza el periodo y el valor del cupon'}
          icon={<TrendingUp className="text-white" width="64" height="64" />}
          link={'/home/herramientas/valor-futuro'}
        />
        <ToolsCard
          title={'Valor presente'}
          description={'Podremos calcular el valor de un bono en base al valor nominal, la taza el periodo y el valor del cupon'}
          icon={<ClipboardList className="text-white" width="64" height="64" />}
          link={'/home/herramientas/calculo-bonos'}
        />

      </div>
      <div className="flex flex-row mt-8">
        <ToolsCard
          title={'Tabla de moritzacion'}
          description={'Podremos calcular el valor de un bono en base al valor nominal, la taza el periodo y el valor del cupon'}
          icon={<OfficeBuilding className="text-white" width="64" height="64" />}
          link={'/home/herramientas/calculo-bonos'}
        />
      </div>
    </div>

  )
}

export default React.memo(IndexTools)