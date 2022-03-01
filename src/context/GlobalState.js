import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  incomeTransactions:
    JSON.parse(localStorage.getItem("incomeTransactions")) || [],
  expenseTransactions:
    JSON.parse(localStorage.getItem("expenseTransactions")) || [],
  users: JSON.parse(localStorage.getItem("users")) || [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@gmail.com",
      password: "1234",
      pin: "1234",
      balance: 500,
      expenses: [
        { expenseName: "Electricity bill", amount: 500, expenseID: 1 },
      ],
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@gmail.com",
      password: "4321",
      pin: "1234",
      balance: 1000,
      expenses: [],
    },
  ],
};

export const GlobalContext = createContext(initialState);

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem(
      "incomeTransactions",
      JSON.stringify(state.incomeTransactions)
    );
    localStorage.setItem(
      "expenseTransactions",
      JSON.stringify(state.expenseTransactions)
    );
    localStorage.setItem("users", JSON.stringify(state.users));
  });

  const deleteTransaction = (id) => {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  };

  const addIncome = (incomeTransaction) => {
    dispatch({
      type: "ADD_INCOME",
      payload: incomeTransaction,
    });
  };

  const addExpense = (expenseTransaction) => {
    dispatch({
      type: "ADD_EXPENSE",
      payload: expenseTransaction,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        incomeTransactions: state.incomeTransactions,
        expenseTransactions: state.expenseTransactions,
        users: state.users,
        deleteTransaction,
        addIncome,
        addExpense,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
