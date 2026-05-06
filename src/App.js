import { useState } from 'react';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Food');

  const categories = {
    income: ['Salary', 'Freelance', 'Investment', 'Other'],
    expense: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Other']
  };

  const addTransaction = () => {
    if (!description || !amount) return;
    const transaction = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toLocaleDateString('en-NZ')
    };
    setTransactions([transaction, ...transactions]);
    setDescription('');
    setAmount('');
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const thisMonthExpense = transactions
    .filter(t=> t.type === 'expense' && new Date(t.date).getMonth()===new Date().getMonth())
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="app">
      <h1>💰 Budget Tracker</h1>

      <div className="summary">
        <div className="summary-card balance">
          <div className="label">Balance</div>
          <div className="value" style={{ color: balance >= 0 ? '#4CAF50' : '#f44336' }}>
            ${balance.toFixed(2)}
          </div>
        </div>
        <div className="summary-card">
          <div className="label">Income</div>
          <div className="value income">+${totalIncome.toFixed(2)}</div>
        </div>
        <div className="summary-card">
          <div className="label">Expenses</div>
          <div className="value expense">-${totalExpense.toFixed(2)}</div>
        </div>
        <div className="summary-card">
          <div className='label'>This Month</div>
          <div className='value expense'>-${thisMonthExpense.toFixed(2)}</div>
        </div>
      </div>

      <div className="form-card">
        <h2>Add Transaction</h2>
        <div className="type-toggle">
          <button
            className={type === 'expense' ? 'active expense' : ''}
            onClick={() => { setType('expense'); setCategory('Food'); }}
          >Expense</button>
          <button
            className={type === 'income' ? 'active income' : ''}
            onClick={() => { setType('income'); setCategory('Salary'); }}
          >Income</button>
        </div>
        <input
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Amount"
          type="number"
          min="0"
        />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          {categories[type].map(c => <option key={c}>{c}</option>)}
        </select>
        <button className="add-btn" onClick={addTransaction}>Add</button>
      </div>

      <div className="transactions">
        <h2>Transactions</h2>
        {transactions.length === 0 && <p style={{ color: '#888' }}>No transactions yet</p >}
        {transactions.map(t => (
          <div key={t.id} className={`transaction ${t.type}`}>
            <div className="transaction-info">
              <div className="transaction-desc">{t.description}</div>
              <div className="transaction-meta">{t.category} · {t.date}</div>
            </div>
            <div className="transaction-amount">
              {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
            </div>
            <button className="delete-btn" onClick={() => deleteTransaction(t.id)}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
