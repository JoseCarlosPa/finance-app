import React, {useCallback, useEffect, useMemo} from 'react';
import {Doughnut, Pie} from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {getAuth} from "firebase/auth";
import {collection, getDocs, orderBy, query} from "firebase/firestore";
import {db} from "../../App";

type labelCounter = {
    label: string,
    count: number
    color: string
}

const Dashboard = () => {
  const auth = getAuth()

  const [labels, setLabels] = React.useState<labelCounter[]>([]);

  const getCutDate = useCallback(() => {
    const month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const d = new Date();
    let name = month[d.getMonth()];
    return `${name}`

  }, [])



  const getLabels = useCallback(async () => {
    const user = auth.currentUser
    if (user === null) {
      return
    }
    const outcomesArray = query(collection(db, "users", user.uid, "outcomes"))
    const querySnapshot = await getDocs(outcomesArray);
    let labels: labelCounter[] = []
    querySnapshot.forEach((doc) => {
      // add label to array
      const label = doc.data().categorie
      const index = labels.findIndex((item) => item.label === label)

      const randomColor = () =>{
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(100);
        const b = Math.floor(255);
        return `rgb(${r}, ${g}, ${b})`;
      }

      if (index === -1) {
        labels.push({
          label: label,
          count: 1,
          color: randomColor()
        })
      } else {
        labels[index].count += 1
      }
    })
    setLabels(labels)
  },[])

  useEffect(() => {
    getLabels()
  }, [])

  const labelNames = useMemo(() => {
    let names: string[] = []
    labels.forEach((item) => {
      names.push(item.label)
    } )
    return names
  },[labels])

  const labelCounts = useMemo(() => {
    let counts: number[] = []
    labels.forEach((item) => {
      counts.push(item.count)
    } )
    return counts
  },[labels])

  const labelColors = useMemo(() => {
    let colors: string[] = []
    labels.forEach((item) => {
      colors.push(item.color)
    } )
    return colors
  },[labels])

  const data = {
    labels: labelNames,
    datasets: [
      {
        label: '# de gastos',
        data: labelCounts,
        backgroundColor: labelColors,
        borderWidth: 1,
      },
    ],
  }

  ChartJS.register(ArcElement, Tooltip, Legend);
  return (
    <>
      <main className="">
        <div className="flex flex-col">
          <div className="flex flex-row">
            <h2>Control de gastos de este mes {getCutDate()}</h2>
          </div>
          <div className="flex flex-row">
            <div>
              <Pie data={data}/>
              <p className="underline text-blue-500"><a href="/home/gastos">Ver mas</a></p>
            </div>

          </div>
        </div>
      </main>
    </>
  )
}
export default React.memo(Dashboard);