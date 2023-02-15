import React, {useCallback, useEffect} from 'react'
import {Bar} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {getMonthDate} from "../Dashboard";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../../App";
import {getAuth} from "firebase/auth";

const BarChart = () => {
  const auth = getAuth()
  const user = auth.currentUser

  const [labels, setLabels] = React.useState<string[]>([]);
  const [values, setValues] = React.useState<number[]>([]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Gastos por Día',
      },
    },
  };

  const fillLabels = useCallback(async () => {
    if (user === null) {
      return
    }

    const today = new Date()
    const month = today.getMonth() + 1
    const year = today.getFullYear()
    const days = new Date(year, month, 0).getDate()
    const labels: string[] = []
    const docValues: any = []
    const localValues: number[] = []

    const outcomesArray = query(collection(db, "users", user.uid, "outcomes"), where("date", ">=", new Date(`${year}-${month}-01`)), where("date", "<=", new Date(`${year}-${month}-${days} 23:59:59`)))
    const querySnapshot = await getDocs(outcomesArray);
    querySnapshot.forEach((doc) => {
      docValues.push({
        "date": new Date(Number(doc.data().date.toString().substring(18, 28)) * 1000).getDate(),
        "amount": Number(doc.data().amount)
      })
    })

    for (let k = 0; k <= days; k++) {
      localValues.push(0)
    }

    for (let i = 0; i <= days; i++) {
      labels.push(`${getMonthDate()} ${i}`)
      for(let j = 0; j < docValues.length; j++){
        if(docValues[j].date === i){
          localValues[i] = localValues[i] + (docValues[j].amount)
        }
      }
    }

    setValues(localValues)
    setLabels(labels)

  }, [user])

  useEffect(() => {
    fillLabels()
  }, [])

  const data = {
    labels,
    datasets: [
      {
        label: 'Gasto',
        data: values,
        backgroundColor: 'rgba(99,143,255,0.5)',
      },

    ],
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  return (
    <div className="w-2/5">
      <Bar options={options} data={data}/>
    </div>);

}

export default React.memo(BarChart)