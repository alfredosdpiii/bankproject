import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CurrencyFormat from "react-currency-format";

import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

import { useTransactionContext } from "../../States/TransactionContext";

const Expenseinput = () => {
  const [
    { toEditExpense, expensesList, totalExpense, user, totalFunds },
    dispatch,
  ] = useTransactionContext();

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();
  const [costOnchageValue, setCostOnchageValue] = useState("");
  const [itemOnchageValue, setItemOnchageValue] = useState("");
  // update accounts when user changes
  useEffect(() => {
    dispatch({
      type: "UPDATE_ACCOUNTS",
      updatedUser: user,
    });
  }, [user]);
  // Add the expences to local storage on load and every time expence add

  useEffect(() => {
    if (toEditExpense.cost && toEditExpense.item) {
      setItemOnchageValue(toEditExpense.item);
      setCostOnchageValue(toEditExpense.cost);
    }
  }, [toEditExpense]);

  const saveEditedExpense = () => {
    const editedExpense = {
      item: itemOnchageValue,
      cost: costOnchageValue,
      id: toEditExpense.id,
    };
    //  check the values if it's the same
    if (
      itemOnchageValue !== toEditExpense.item ||
      costOnchageValue !== toEditExpense.cost
    ) {
      dispatch({
        type: "EDIT_EXPENSE",
        editedExpense,
        currCost: costOnchageValue,
        prevCost: toEditExpense.cost,
      });

      // alert.show(`${itemOnchageValue} updated`, {
      //   // custom timeout just for this one alert
      //   type: "success",
      // });
      toast(`${itemOnchageValue} updated`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });

      setItemOnchageValue("");
      setCostOnchageValue("");
      cancelEditExpense();
    } else {
      cancelEditExpense();
    }
  };

  // cancel edit, reset the  input value
  const cancelEditExpense = () => {
    dispatch({
      type: "GET_TO_EDIT_EXPENSE",
      toEditExpense: {},
    });
    setItemOnchageValue("");
    setCostOnchageValue("");
  };
  // Get recent expence
  const getRecentExpense = (recentExpense) => {
    const { item, cost } = recentExpense;
    const toDisplayCost = parseFloat(cost.replace(/\$|,/g, ""));
    //   set the value of input to expences
    const expence = {
      item,
      cost,
      id: uuidv4(),
    };
    dispatch({
      type: "SET_USER",
      user: {
        ...user,
        expensesList: [...user.expensesList, expence],
      },
    });
    dispatch({
      type: "ADD_EXPENSE",
      recentExpense: expence,
    });
    dispatch({
      type: "ADD_RECENT_COST_TO_TOTAL_EXPENSE",
      cost: toDisplayCost,
    });
    dispatch({
      type: "SUBTRACT_RECENT_COST_TO_FUNDS",
      cost: toDisplayCost,
    });
    // alert.show(`${item} costing: ${cost} added`, {
    //   // custom timeout just for this one alert
    //   type: "success",
    // });
    toast(`${item} added! cost: ${cost}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
    //  reset inputs
    resetField("item");
    resetField("cost");
    setCostOnchageValue("");
    setItemOnchageValue("");
  };

  return (
    <div className="h-full flex flex-col justify-between items-center">
      <h1 className="font-montserratBold text-secondary text-lg">
        Add an expense
      </h1>
      <form
        className="w-full h-2/3 flex flex-col justify-between items-center"
        onSubmit={handleSubmit(getRecentExpense)}
      >
        <div
          className={`flex justify-evenly items-center flex-col  ${
            toEditExpense.cost ? "w-2/4 items-center" : " w-5/12"
          }`}
        >
          <input
            value={itemOnchageValue}
            {...register("item", {
              required: "true",
              onChange: (e) => setItemOnchageValue(e.target.value),
            })}
            className="h-1/2 w-2/4 border p-5 outline-none bg-inputColor rounded-lg "
            type="text"
            name="item"
          />
          <label
            className="text-secondary font-robotoSemiBold text-xs"
            htmlFor="item"
          >
            Item
          </label>
        </div>
        <div
          className={`flex justify-evenly items-center flex-col ${
            toEditExpense.cost ? "w-2/4 items-center" : "w-5/12"
          }`}
        >
          <input
            value={costOnchageValue}
            {...register("cost", {
              required: "true",
              onChange: (e) => setCostOnchageValue(e.target.value),
            })}
            type="number"
            className="h-1/2 w-2/4 rounded-lg borde routline-none p-5 bg-inputColor"
            name="cost"
          />
          <label
            className=" text-secondary font-robotoSemiBold text-xs"
            htmlFor="item"
          >
            Cost
          </label>
        </div>
        <button
          className={`h-1/2 mt-3 font-montserratBold text-sm bg-secondary ${
            toEditExpense.cost ? "hidden" : " block"
          } text-white rounded-lg p-3`}
          type="submit"
        >
          Add
        </button>
      </form>
      <div className="flex">
        <button
          onClick={saveEditedExpense}
          className={`h-3/4 w-full mt-3 font-montserratBold text-sm bg-primary ${
            toEditExpense.cost ? "block" : " hidden"
          } text-white rounded-lg p-3`}
          type="submit"
        >
          Save
        </button>
        <button
          onClick={cancelEditExpense}
          className={`h-3/4 w-full mt-3 font-montserratBold text-sm bg-transparent text-red-500 ${
            toEditExpense.cost ? "block" : " hidden"
          } text-red-400 rounded-lg p-3`}
          type="submit"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Expenseinput;
