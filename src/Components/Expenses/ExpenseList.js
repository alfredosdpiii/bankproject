import React, { useState, useEffect } from "react";
import { useTransactionContext } from "../../States/TransactionContext";
import EmptyListMessage from "../EmptyListMessage";
import CurrencyFormat from "react-currency-format";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
function ExpenseList() {
  const [{ expensesList, totalFunds, user }, dispatch] =
    useTransactionContext();
  useEffect(() => {
    // fetch new expence to reflect on expence list
    dispatch({
      type: "SET_EXPENSE_LIST",
      expensesList: user.expensesList,
    });
  }, [user]);
  const deleteExpense = (id, cost, item, idx) => {
    const toDisplayCost =
      typeof cost === "number" ? cost : parseFloat(cost.replace(/\$|,/g, ""));
    dispatch({
      type: "DELETE_EXPENSE",
      toDeleteExpenseID: id,
    });
    dispatch({
      type: "SET_USER",
      user: {
        ...user,
        expensesList: expensesList.filter((_, prevIdx) => prevIdx !== idx),
      },
    });
    dispatch({
      type: "ADD_DELETED_COST_TO_FUNDS",
      cost: toDisplayCost,
    });
    dispatch({
      type: "SUBTRACT_DELETED_COST_TO_EXPENSE",
      cost: toDisplayCost,
    });

    // alert.show(`${item} expence deleted`, {
    //   // custom timeout just for this one alert
    //   type: "error",
    // });
    toast(`${item} deleted`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };
  const getToEditExpense = (item, cost, id) => {
    const toEditExpense = {
      item,
      cost,
      id,
    };
    dispatch({
      type: "GET_TO_EDIT_EXPENSE",
      toEditExpense: toEditExpense,
    });
  };

  return (
    <div className="w-full h-full text-center">
      {expensesList.length > 0 ? (
        <Table className="w-full h-4/5" variant="striped" colorScheme="purple">
          <Thead>
            <Tr className=" text-center font-montserratBold text-primary h-12 rounded-lg">
              <Th>Item</Th>
              <Th>Cost</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody className="w-full">
            {expensesList.map(({ item, cost, id }, idx) => (
              <Tr key={id} className="border-b-2 ">
                <Td className="text-xs text-secondary">{item}</Td>
                <Td className="text-xs text-secondary">
                  {
                    <CurrencyFormat
                      className="text-secondary text-xs"
                      value={cost}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  }
                </Td>
                <Td>
                  <button
                    onClick={() => getToEditExpense(item, cost, id)}
                    className="mr-5"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                      <path
                        fillRule="evenodd"
                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button onClick={() => deleteExpense(id, cost, item, idx)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <EmptyListMessage />
      )}
    </div>
  );
}

export default ExpenseList;
