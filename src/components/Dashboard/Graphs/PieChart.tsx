import React, {useCallback, useEffect, useMemo} from 'react'
import {Pie} from "react-chartjs-2";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import {getAuth} from "firebase/auth";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../../App";
import {labelCounter} from "../Dashboard";

const PieChart = () => {

  ChartJS.register(ArcElement, Tooltip, Legend);


  const auth = getAuth()
  const user = auth.currentUser

  const [labels, setLabels] = React.useState<labelCounter[]>([]);



  const getLabels = useCallback(async () => {
    if (user === null) {
      return
    }
    const today = new Date()
    const month = today.getMonth() + 1
    const year = today.getFullYear()
    const days = new Date(year, month, 0).getDate()

    const outcomesArray = query(collection(db, "users", user.uid, "outcomes"),where("date", ">=", new Date(`${year}-${month}-01`)),where("date", "<=", new Date(`${year}-${month}-${days}`)))
    const querySnapshot = await getDocs(outcomesArray);
    let labels: labelCounter[] = []
    querySnapshot.forEach((doc) => {
      // add label to array
      const label = doc.data().categorie
      const index = labels.findIndex((item) => item.label === label)

      const randomColor = () =>{
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(150);
        const b = Math.floor(Math.random() * 255);
        return `rgb(${r}, ${g}, ${b})`;
      }

      if (index === -1) {
        labels.push({
          label: label,
          count: Number(doc.data().amount),
          color: randomColor()
        })
      } else {
        labels[index].count += Number(doc.data().amount)
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

  return(
    <div>
      <Pie data={data}/>
      <p className="underline text-blue-500"><a href="/home/gastos">Ver mas</a></p>
    </div>
  );
}

export default React.memo(PieChart)