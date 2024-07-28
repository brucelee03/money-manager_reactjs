import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props
  const {id, title, amount, type} = transactionDetails

  const onDeleteTransaction = () => {
    deleteTransaction(id)
  }

  return (
    <li className="transaction-item">
      <div>
        <p className="column-value">{title}</p>
      </div>
      <div>
        <p className="column-value">Rs {amount}</p>
      </div>
      <div>
        <p className="column-value">{type}</p>
      </div>
      <button type="button" onClick={onDeleteTransaction} data-testid="delete">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-button"
        />
      </button>
    </li>
  )
}

export default TransactionItem
