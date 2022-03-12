import React, { useEffect } from "react";
import { useTransactionContext } from "../../States/TransactionContext";
import Accountinfo from "../Account/AccountInfo";
import Expenseinput from "./ExpenseInput";
import ExpenseList from "./ExpenseList.js";
import UserControl from "../Account/UserControl";

const ManageExpenses = () => {
  const [{ expensesList, totalFunds, totalExpense, user, accounts }, dispatch] =
    useTransactionContext();
  useEffect(() => {
    localStorage.setItem("User", JSON.stringify(user));
  }, [user]);

  return (
    <div className="w-full h-full flex-row justify-center items-center">
      <div className="w-full h-2/4 ">
        <Accountinfo />
        <UserControl />
        <Expenseinput />
      </div>
      <div className="h-2/4 w-full flex justify-center items-center">
        <ExpenseList />
      </div>
    </div>
  );
};

export default ManageExpenses;
