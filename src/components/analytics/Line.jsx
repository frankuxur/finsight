import { Line as LineChart } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import useTransactionsStore from '../../store/transactionsStore'
import time from '../../utils/time'
import useWindowDimensions from '../../hooks/useWindowDimensions'

ChartJS.register (
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const Line = () => {
  let transactions = useTransactionsStore(state => state.transactions)
  transactions = transactions.map(({amount, type, createdOn}) => ({amount: type === 'Credit' ? +amount : +amount * -1, type, createdOn: time(createdOn)})).reverse()
  transactions = transactions.reduce((acc, curr) => {
    if (!acc[curr.createdOn]) {
        acc[curr.createdOn] = curr.amount
    } else {
        acc[curr.createdOn] += curr.amount
    }
    return acc
  }, {})
  
  const transactionsLabels = Object.keys(transactions)
  const transactionsData = Object.values(transactions)
  
  const data = {
    labels: transactionsLabels,
    datasets: [
        {
            label: '',
            data: transactionsData,
            borderColor: '#CCCCCC',
            cubicInterpolationMode: 'monotone',
        }
    ]
  }  

  const { height, width } = useWindowDimensions()

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
        display: false, // Hide legend labels
    },
    plugins: {
        legend: {
            display: false,
        } 
    },
    scales: {    
        x: {  
            ticks:{
                // display: false 
            },    
            border: {
              display: false
            },   
            grid: {
                color: '#ffffff22',
            },      
        },
        y: {  
            ticks:{
                display: width > 480
            },   
            border: {
              display: false
            }, 
            grid: {
                // display: false,
                color: '#ffffff08',
            },       
        },
    },  
    // events: [],
  }

  return (
    <div className="chart">
        <div className="line">
            <LineChart id='canvas' options={options} data={data} />
        </div>
    </div>
  )
}

export default Line