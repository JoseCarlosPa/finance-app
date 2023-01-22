import React, {useCallback} from 'react';
const Dashboard = () => {

  const getCutDate = useCallback(() => {
    const month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const d = new Date();
    let name = month[d.getMonth()];

    return `${name}`

  }, [])

  return (
    <>
      <main className="">
        <div className="flex flex-row">
          <h2>Control de gastos de este mes {getCutDate()}</h2>
        </div>

      </main>
    </>
  )
}
export default React.memo(Dashboard);