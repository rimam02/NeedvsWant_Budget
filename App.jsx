import { useState } from "react";
import "./App.css";

function App() {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [category, setCategory] = useState("");
  const [needs, setNeeds] = useState([]);
  const [wants, setWants] = useState([]);
  const [message, setMessage] = useState("");

  function addExpense(e) {
    e.preventDefault();

    if (expenseName.trim() === "" || expenseAmount === "" || category === "") {
      setMessage("Please fill all fields.");
      return;
    }

    if (Number(expenseAmount) <= 0) {
      setMessage("Please enter a valid amount.");
      return;
    }

    const newExpense = {
      id: Date.now(),
      name: expenseName,
      amount: expenseAmount,
    };

    if (category === "Need") {
      setNeeds([...needs, newExpense]);
    } else {
      setWants([...wants, newExpense]);
    }

    setExpenseName("");
    setExpenseAmount("");
    setCategory("");
    setMessage("Expense added successfully!");
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Need vs. Want Budgeter</h1>
        <p className="subtitle">
          Add your expense and categorize it as a Need or a Want.
        </p>

        <form className="form-box" onSubmit={addExpense}>
          <input
            type="text"
            placeholder="Enter expense name"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Enter amount"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Need">Need</option>
            <option value="Want">Want</option>
          </select>

          <button type="submit">Add Expense</button>
        </form>

        <p className={message.includes("successfully") ? "success" : "error"}>
          {message}
        </p>

        <div className="lists">
          <div className="list-box need-box">
            <h2>Needs</h2>

            {needs.length === 0 ? (
              <p className="empty">No needs added yet.</p>
            ) : (
              <ul>
                {needs.map((item) => (
                  <li key={item.id}>
                    <span>{item.name}</span>
                    <span>₹{item.amount}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="list-box want-box">
            <h2>Wants</h2>

            {wants.length === 0 ? (
              <p className="empty">No wants added yet.</p>
            ) : (
              <ul>
                {wants.map((item) => (
                  <li key={item.id}>
                    <span>{item.name}</span>
                    <span>₹{item.amount}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;