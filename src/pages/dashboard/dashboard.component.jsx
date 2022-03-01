import React from "react";
import "../../App.css";
import Balance from "./Balance";
import IncomeList from "./IncomeList";
import ExpenseList from "./ExpenseList";
import AddTransaction from "./AddTransaction";

function Dashboard() {
  return (
    <>
      <div className="min-h-full">
        {/* <header className="bg-white shadow"> */}
        {/*   <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"> */}
        {/*   </div> */}
        {/* </header> */}
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="px-4 py-6 sm:px-0">
              <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                <Balance />
                <IncomeList />
                <ExpenseList />
                <AddTransaction />
              </div>
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
