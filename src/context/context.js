import React, { useReducer, createContext } from "react";

import contextReducer from "./contextReducer";

const initialState = JSON.parse(localStorage.getItem("transactions")) || [
  {
    amount: 1000,
    category: "Gifts",
    type: "Income",
    date: "2022-05-02",
    id: "b214a1b5-09a5-4535-812a-c903fa90176e",
  },
  {
    amount: 25000,
    category: "Salary",
    type: "Income",
    date: "2022-05-04",
    id: "130e6a1d-07fa-4759-b412-8d5de2cfd7b8",
  },
  {
    amount: 6000,
    category: "Shopping",
    type: "Expense",
    date: "2022-05-02",
    id: "e8b4c884-28ac-4f6b-8018-fbf6fe268978",
  },
  {
    amount: 1000,
    category: "Food",
    type: "Expense",
    date: "2022-05-02",
    id: "fb9367d3-e467-4c55-be7b-61078e496120",
  },
];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
  const [transactions, dispatch] = useReducer(contextReducer, initialState);
  //Action Creators
  const deleteTransaction = (id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };

  const addTransaction = (transaction) => {
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
  };

  //console.log(transactions);
  //calculating for balance
  const balance = transactions.reduce((acc, currVal) => {
    return currVal.type === "Expense"
      ? acc - currVal.amount
      : acc + currVal.amount;
  }, 0);
  //end..

  return (
    <ExpenseTrackerContext.Provider
      value={{ deleteTransaction, addTransaction, transactions, balance }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
