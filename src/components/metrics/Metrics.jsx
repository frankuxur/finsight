import useTransactionsStore from '../../store/transactionsStore'
import './metrics.css'
import { computeMetrics } from '../../helpers/computeMetrics'
import { useMemo } from 'react'
import Loader from '../loader/Loader'
import { formatIndianCurrency } from '../../utils/formatIndianCurrency'

const Metrics = () => {
  const transactions = useTransactionsStore(state => state.transactions)
  const { inc, exp, final } = useMemo(() => computeMetrics(transactions), [transactions])

  return (
    <ul className="metrics">
        <li className="metric">
            <h2 className="metric__title">
                <span>Income</span>
            </h2>
            {transactions.length && (inc === 0 || !!inc) ? (
                <div className="metric__figure">
                    <span className='metric__currency'>&#8377;</span>
                    <span>{formatIndianCurrency(inc)}</span>
                </div>
            ) : <Loader />}
        </li>

        <li className="metric">
            <h2 className="metric__title">
                <span>Expenditure</span>
            </h2>
            {transactions.length && (exp === 0 || !!exp) ? (
                <div className="metric__figure">
                    <span className='metric__currency'>&#8377;</span>
                    <span>{formatIndianCurrency(exp)}</span>
                </div>
            ) : <Loader />}
        </li>

        <li className="metric">
            <h2 className="metric__title">
                <span>{final < 0 ? 'Debt' : 'Savings'}</span>
            </h2>
            {transactions.length && (final === 0 || !!final) ? (
                <div className="metric__figure">
                    <span>{final < 0 ? '-' : ''}</span>
                    <span className='metric__currency'>&#8377;</span>
                    <span>{formatIndianCurrency(final < 0 ? final * -1 : final)}</span>
                </div>
            ) : <Loader />}
        </li>
    </ul>
  )
}

export default Metrics