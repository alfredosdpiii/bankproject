import CurrencyFormat from "react-currency-format";
import { useTransactionContext } from "../../States/TransactionContext";
import { useEffect } from "react";
const Accountinfo = () => {
  const userFromLocalStorage = localStorage.getItem("User");
  const [{ totalFunds, totalExpense, accounts, user, expensesList }, dispatch] =
    useTransactionContext();

  return (
    <div className="w-full h-full py-10 flex flex-col justify-center items-center text-center">
      <div className=" h-2/4 w-full flex flex-col justify-center">
        <h1 className="text-gray-600 font-robotoSemiBold text-4xl">
          {user.userName}
        </h1>
        <CurrencyFormat
          className="text-secondary font-montserratBold mt-2 text-sm"
          value={user.id}
          displayType={"text"}
          format="#### #### #### ####"
        />
        <p className="text-xs font-robotoSemiBold text-secondary mt-3">
          {user.email}
        </p>
      </div>
      <div className=" w-full h-1/2 flex justify-center items-center py-5 ">
        <div className="flex w-44 justify-between mr-5">
          <div className="circle rounded-full w-14 h-14 bg-cardBg flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>{" "}
            {/* <Accmoneysvg /> */}
          </div>
          <div className="amount flex flex-col justify-center items-center">
            <CurrencyFormat
              className="text-xl font-bold font-robotoSemiBold text-gray-700"
              value={user.totalFunds}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
            <p className="text-left text-xs w-full text-secondary">
              Your funds
            </p>
          </div>
        </div>
        <div className="flex w-44 justify-between ">
          <div className="circle rounded-full w-14 h-14 bg-cardBg flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path
                fillRule="evenodd"
                d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                clipRule="evenodd"
              />
            </svg>{" "}
            {/* <Expensessvg /> */}
          </div>
          <div className="amount flex flex-col justify-center items-center">
            <CurrencyFormat
              className="text-xl font-bold font-robotoSemiBold text-gray-700"
              value={user.totalExpense}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
            />
            <p className="text-left text-xs w-full text-secondary">Expenses</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accountinfo;
