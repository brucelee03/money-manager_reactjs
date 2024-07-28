import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    selectedType: transactionTypeOptions[0].optionId,
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
    transactionsList: [],
  }

  onAddingTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onAddingAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onSelectingType = event => {
    this.setState({selectedType: event.target.value})
  }

  onSubmitTheTransaction = event => {
    event.preventDefault()
    const {
      titleInput,
      amountInput,
      selectedType,
      totalIncome,
      totalExpenses
    } = this.state

    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: amountInput,
      type: selectedType,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      selectedType: transactionTypeOptions[0].optionId,
    }))

    if (selectedType === transactionTypeOptions[0].optionId) {
      this.setState(prevState => ({
        totalBalance: totalIncome - totalExpenses,
        totalIncome: prevState.totalIncome + parseInt(amountInput),
      }))
    } else {
      this.setState(prevState => ({
        totalBalance: totalIncome - totalExpenses,
        totalExpenses: prevState.totalExpenses + parseInt(amountInput),
      }))
    }
    return false
  }

  onDeleteTransaction = id => {
    const {
      totalBalance,
      totalIncome,
      totalExpenses,
      transactionsList
    } = this.state
    const transactionToDelete = transactionsList.find(
      transaction => transaction.id === id,
    )
    const updatedTransactionsList = transactionsList.filter(
      transaction => transaction.id !== id,
    )

    let updatedTotalBalance = totalBalance
    let updatedTotalIncome = totalIncome
    let updatedTotalExpenses = totalExpenses

    if (transactionToDelete.type === 'Income') {
      updatedTotalBalance -= transactionToDelete.amount
      updatedTotalIncome -= transactionToDelete.amount
    } else {
      updatedTotalBalance += transactionToDelete.amount
      updatedTotalExpenses -= transactionToDelete.amount
    }

    this.setState({
      transactionsList: updatedTransactionsList,
      totalBalance: updatedTotalBalance,
      totalIncome: updatedTotalIncome,
      totalExpenses: updatedTotalExpenses,
    })
  }

  render() {
    const {
      titleInput,
      amountInput,
      selectedType,
      totalBalance,
      totalIncome,
      totalExpenses,
      transactionsList,
    } = this.state

    return (
      <div className="bg-container">
        <div className="user-card">
          <h1 className="user-name">Hi, Richard</h1>
          <p className="greeting">
            Welcome back to your <span className="app-name">Money Manager</span>
          </p>
        </div>
        <ul className="transactions-item-container">
          <MoneyDetails
            totalBalance={totalBalance}
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
          />
        </ul>
        <div className="transactions-data">
          <div className="add-transactions-card">
            <p className="sub-heading">Add transaction</p>
            <form
              onSubmit={this.onSubmitTheTransaction}
              className="transaction-form"
            >
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                type="text"
                value={titleInput}
                onChange={this.onAddingTitle}
                placeholder="TITLE"
                id="title"
                className="input"
              />
              <label htmlFor="amount" className="label">
                AMOUNT
              </label>
              <input
                type="text"
                value={amountInput}
                onChange={this.onAddingAmount}
                placeholder="AMOUNT"
                id="amount"
                className="input"
              />
              <label htmlFor="type" className="label">
                TYPE
              </label>
              <select
                id="type"
                className="input"
                onChange={this.onSelectingType}
                value={selectedType}
              >
                {transactionTypeOptions.map(eachType => (
                  <option
                    key={eachType.optionId}
                    value={eachType.optionId}
                    className="option"
                  >
                    {eachType.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="button">
                Add
              </button>
            </form>
          </div>
          <div className="history-transactions-card">
            <p className="sub-heading">History</p>
            <div className="transaction-history-nav">
              <div>
                <p className="column">Title</p>
              </div>
              <div>
                <p className="column">Amount</p>
              </div>
              <div>
                <p className="column">Type</p>
              </div>
            </div>
            <ul className="transactions-history-list">
              {transactionsList.map(eachTransaction => (
                <TransactionItem
                  key={eachTransaction.id}
                  transactionDetails={eachTransaction}
                  deleteTransaction={this.onDeleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
