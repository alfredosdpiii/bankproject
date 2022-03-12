import React, { useReducer, useContext } from "react";

const TransactionContext = React.createContext();
export const useTransactionContext = () => useContext(TransactionContext);

export const TransactionContextProvider = ({
  reducer,
  initialState,
  children,
}) => {
  return (
    <TransactionContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </TransactionContext.Provider>
  );
};
