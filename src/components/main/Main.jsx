import './main.css'
import Stats from '../stats/Stats'
import DashboardHeader from './DashboardHeader'
import Form from '../form/Form'
import { useState } from 'react'
import useGetTransactions from '../../hooks/useGetTransactions'
import useTransactionsStore from '../../store/transactionsStore'

const Main = () => {
  const [showStats, setShowStats] = useState(true)
  const { isLoading } = useGetTransactions()
  const transactions = useTransactionsStore(state => state.transactions)

  return (
    <main className="dashboard__main">
      <div className="dashboard__main-content">
        <DashboardHeader showStats={showStats} setShowStats={setShowStats} />

        {showStats ? (
          !transactions.length && !isLoading  ? (
            <div className="dashboard__empty">
              <div>
                <i className="ri-bar-chart-line icon"></i>
              </div>
              <h2><span onClick={() => setShowStats(false)}>add transactions</span> to view statistics</h2>
            </div>
          ) : (
            <Stats isLoading={isLoading} />
          )
        ) : <Form />}     
      </div>
    </main>
  )
}

export default Main