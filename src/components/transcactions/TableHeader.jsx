const TableHeader = () => {
  return (
    <ul className="transactions__row transactions__table-header">
        <li className="transactions__data">
            Description
        </li>
        <li className="transactions__data">
            Amount
        </li>
        <li className="transactions__data">
            Type
        </li>
        <li className="transactions__data">
            Category
        </li>
        <li className="transactions__data">
            Payment Method
        </li>
        <li className="transactions__data">
            Date
        </li>
        <li className="transactions__data">
            Action
        </li>
    </ul>
  )
}

export default TableHeader