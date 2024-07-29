import useTransactionsStore from '../../store/transactionsStore'
import './transactions.css'
import Transaction from './Transaction'
import Loader from '../loader/Loader'
import TableHeader from './TableHeader'
import useWindowDimensions from '../../hooks/useWindowDimensions'

const Transactions = ({ isLoading }) => {
  const transactions = useTransactionsStore(state => state.transactions)
  transactions.sort((a, b) => b.createdOn - a.createdOn)
  
  const { height, width } = useWindowDimensions()

  const isSmall = width < 880

  return (
    <div className="transactions">
        <header className="transactions__header">
            <h2 className="transactions__title">Transactions</h2>
        </header>

        <div className="transactions__body">
            <div className="transactions__table">
                {!isSmall && <TableHeader />}

                {transactions.length && !isLoading ? transactions.map(transaction => (
                    <Transaction key={transaction.id} transaction={transaction} isSmall={isSmall} />
                )) : (
                    <div className="transactions__loader">
                        <Loader />
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default Transactions