import Loader from '../loader/Loader'
import { formatIndianCurrency } from '../../utils/formatIndianCurrency'

const Distribution = ({ data, title, otherDistribution }) => {
  const colorCodes = [
    '#0eaba8bf',
    '#0eaba88a',
    '#0eaba856',
    '#0eaba82d',
  ]
  
  const getBackgroundColor = (index, percentage) => {
    return {
        backgroundColor: `${colorCodes[index]}`,
        width: `${percentage}%`
    }
  }

  if (!data.length) {
    return (
        <div className="distribution distribution__loader">
            {otherDistribution ? (
              <span>no {title.toLowerCase()} to show</span>
            ) : (
              <Loader />
            )}
        </div>
    )
  } 

  return (
    <article className="distribution">
      <h3 className="distribution__title">{title} Distribution</h3>

      <ul className="distribution__stats">
        {data.map(({amount, percentage, category}, idx) => (
          <li key={category} className='distribution__row'>
            <div className='dot' style={{ backgroundColor: `${colorCodes[idx]}` }}></div>
            <div>{category}</div>
            <div>
              <span>₹</span>
              <span>{formatIndianCurrency(amount)}</span>
            </div>
            <div>
              <span>{Math.round((percentage) * 100) / 100}</span>
              <span>%</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="distribution__bar">
        {data.map(({ percentage }, idx) => (
          <span key={idx} style={getBackgroundColor(idx, percentage)}></span>
        ))}
      </div>    
    </article>
  )
}

export default Distribution