import { useMemo } from "react"
import useTransactionsStore from "../../store/transactionsStore"
import { computeMetrics } from "../../helpers/computeMetrics"
import Loader from '../loader/Loader'

const Donut = () => {
  const transactions = useTransactionsStore(state => state.transactions)
  const { inc, exp, } = useMemo(() => computeMetrics(transactions), [transactions])

  const incPercentage = Math.round(inc * 100 / (inc + exp) * 100) / 100
  const expPercentage = Math.round(exp * 100 / (inc + exp) * 100) / 100
  
  const style = {
    backgroundImage: 
    `radial-gradient(
        var(--bg-1) 60%,
        transparent 0 70%,
        var(--bg-1) 0
    ),
    conic-gradient(
        from 30deg,
        var(--teal) ${incPercentage}%,
        var(--bg-1) 0 ${incPercentage+2}%,
        var(--goshawk-gray) 0 98%,
        var(--bg-1) 0
    )`
  }


  return (
    <div className="chart">
      <div className="donut" style={style}></div>
      <ul className="chart__legends">
        <li className="chart__legend inc">
          <span>Income</span>
          {!incPercentage && incPercentage !== 0 ? <Loader /> : (
            <span>{incPercentage ?? <Loader />}%</span>
          )}
        </li>
                
        <li className="chart__legend exp">
          <span>Expense</span>
          {!expPercentage && expPercentage !== 0 ? <Loader /> : (
            <span>{expPercentage}%</span>
          )}
        </li>
      </ul>
    </div>
  )
}

export default Donut