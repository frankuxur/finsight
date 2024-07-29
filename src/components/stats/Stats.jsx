import Analytics from '../analytics/Analytics'
import Distributions from '../distributions/Distributions'
import Metrics from '../metrics/Metrics'
import Transactions from '../transcactions/Transactions'
import './stats.css'

const Stats = () => {
  return (
    <section className="stats">
      <div className="stats__content">
        <Metrics />
        <Analytics />
        <Distributions />
        <Transactions />
      </div>
    </section>    
  )
}

export default Stats


// > stats 
// > net expense
// > net income
// > current balance
// > chart