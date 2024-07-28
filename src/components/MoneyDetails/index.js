import './index.css'

const MoneyDetails = (totalBalance, totalIncome, totalExpenses) => {
  ;<>
    <li className="money-details-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
        alt="balance"
        className="png"
      />
      <div className="money-details">
        <p className="transaction-type">Your Balance</p>
        <p data-testid="balanceAmount" className="rupees">
          {totalBalance}
        </p>
      </div>
    </li>
    <li className="money-details-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
        alt="income"
        className="png"
      />
      <div className="money-details">
        <p className="transaction-type">Your Income</p>
        <p data-testid="incomeAmount" className="rupees">
          {totalIncome}
        </p>
      </div>
    </li>
    <li className="money-details-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
        alt="expenses"
        className="png"
      />
      <div className="money-details">
        <p className="transaction-type">Your Expenses</p>
        <p data-testid="expensesAmount" className="rupees">
          {totalExpenses}
        </p>
      </div>
    </li>
  </>
}

export default MoneyDetails
