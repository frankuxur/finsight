import { useContext } from 'react'
import time from '../../utils/time'
import { ModalContext } from '../../context/ModalContext'
import { DrawerContext } from '../../context/DrawerContext'
import { formatIndianCurrency } from '../../utils/formatIndianCurrency'
import TableHeader from './TableHeader'

const Transaction = ({ transaction, isSmall }) => {
  const { id, amount, category, description, type, paymentMethod, createdOn } = transaction
  const { setShowModal, setModalData } = useContext(ModalContext)
  const { setShowDrawer, setDrawerData } = useContext(DrawerContext)

  const edit = () => {
    setShowDrawer(true)
    setDrawerData(transaction)
  }

  const remove = () => {
    setShowModal(true)
    setModalData({id, description, type})
  }

  return (      
    <ul className={`transactions__row ${isSmall ? 'small' : ''}`}>
      <li className="transactions__data">
        {isSmall && <h4>Description</h4>}
        <span>{description}</span>
      </li>
      <li className="transactions__data">
        {isSmall && <h4>Amount</h4>}
        <span>{formatIndianCurrency(amount)}</span>
      </li>
      <li className="transactions__data">
        {isSmall && <h4>Type</h4>}
        <span>{type}</span>
      </li>
      <li className="transactions__data">
        {isSmall && <h4>Category</h4>}
        <span>{category}</span>
      </li>
      <li className="transactions__data">
        {isSmall && <h4>Payment Method</h4>}
        <span>{paymentMethod}</span>
      </li>
      <li className="transactions__data">
        {isSmall && <h4>Date</h4>}
        <span>{time(createdOn)}</span>
      </li>
      <li className="transactions__data action">
        <button className="transaction__button" onClick={edit}>
            <i className="ri-pencil-line icon"></i>
        </button>
        <button className="transaction__button" onClick={remove}>
            <i className="ri-delete-bin-line icon"></i>
        </button>
      </li>
    </ul>
  )
}

export default Transaction