import useTransactionsStore from '../../store/transactionsStore'
import './distributions.css'
import { computeDistribution, classify } from '../../helpers/distribution'
import Distribution from './Distribution'

const Distributions = () => {
  let transactions = useTransactionsStore(state => state.transactions)
  let classfication = classify(transactions)

  const { credits, debits } = classfication

  const debitDistribution = computeDistribution(debits)
  const creditDistribution = computeDistribution(credits)

  return (
    <div className="distributions">
      <Distribution 
        title='Expense'
        data={debitDistribution}
        otherDistribution={creditDistribution.length}
        />
      
      <Distribution 
        title='Income'
        data={creditDistribution}
        otherDistribution={debitDistribution.length}
      />
    </div>
  )
}

export default Distributions