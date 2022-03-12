import React from "react";
import Deposit from "../Account/Deposit";
// import Send from "../Account/Send";
// import ExpenseGraph from "../Expenses/ExpenseGraph";
import Withdraw from "../Account/Withdraw";
const Usercontrol = () => {
  return (
    <div className="flex flex-col h-full items-center w-full py-10">
      <section className="flex h-full w-full justify-center items-center">
        <div className="w-2/4 h-m flex p-10 rounded-lg bg-cardBg justify-center items-center">
          <Deposit />
          <Withdraw />
          {/* <Send /> */}
        </div>
      </section>
      {/* <section className="h-4/5  w-full flex justify-center items-center"> */}
      {/* <ExpenseGraph /> */}
      {/* </section> */}
    </div>
  );
};

export default Usercontrol;
