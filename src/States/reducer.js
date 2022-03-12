// get local storage var if there is
const usersFromLocalStorage = localStorage.getItem("Users");
const userFromLocalStorage = localStorage.getItem("User");
// set initial state
export const initialState = {
  expensesList: userFromLocalStorage
    ? JSON.parse(userFromLocalStorage).expensesList
    : [],
  totalFunds: userFromLocalStorage
    ? JSON.parse(userFromLocalStorage).totalFunds
    : 1000,
  totalExpense: userFromLocalStorage
    ? JSON.parse(userFromLocalStorage).totalExpense
    : 0,
  depositVal: 0,
  withdrawVal: 0,
  user: userFromLocalStorage ? JSON.parse(userFromLocalStorage) : {},
  accounts: usersFromLocalStorage ? JSON.parse(usersFromLocalStorage) : [],
  toEditExpense: {},
  isLoggedIn: userFromLocalStorage
    ? JSON.parse(userFromLocalStorage).email
      ? true
      : false
    : "",
};

const types = {
  add_expense: "ADD_EXPENSE",
  withdraw: "WITHDRAW",
  deposit: "DEPOSIT",
  delete_expense: "DELETE_EXPENSE",
  get_to_edit_expense: "GET_TO_EDIT_EXPENSE",
  edit_expense: "EDIT_EXPENSE",
  get_total_expense: "GET_TOTAL_EXPENSE",
  subtract_expense_to_funds: "SUBTRACT_EXPENSE_TO_FUNDS",
  add_recent_cost_to_total_expense: "ADD_RECENT_COST_TO_TOTAL_EXPENSE",
  subtract_recent_cost_to_funds: "SUBTRACT_RECENT_COST_TO_FUNDS",
  add_deleted_cost_to_funds: "ADD_DELETED_COST_TO_FUNDS",
  subtract_deleted_cost_to_expense: "SUBTRACT_DELETED_COST_TO_EXPENSE",
  add_user: "ADD_USER",
  set_user: "SET_USER",
  toggle_login: "TOGGLE_LOGIN",
  update_accounts: "UPDATE_ACCOUNTS",
  set_expense_list: "SET_EXPENSE_LIST",
  delete_account: "DELETE_ACCOUNT",
  send_funds: "SEND_FUNDS",
  subtract_sent_amount: "SUBTRACT_SENT_AMOUNT",
  update_stats: "UPDATE_STATS",
};

export const reducer = (state, action) => {
  const updatedUser = { ...state.user };
  let totalFunds = updatedUser.totalFunds;
  let totalExpense = updatedUser.totalExpense;
  const {
    add_expense,
    withdraw,
    deposit,
    delete_expense,
    edit_expense,
    get_to_edit_expense,
    get_total_expense,
    subtract_expense_to_funds,
    add_recent_cost_to_total_expense,
    subtract_recent_cost_to_funds,
    add_deleted_cost_to_funds,
    subtract_deleted_cost_to_expense,
    add_user,
    set_user,
    toggle_login,
    update_accounts,
    set_expense_list,
    delete_account,
    send_funds,
    subtract_sent_amount,
    update_stats,
  } = types;
  switch (action.type) {
    // Expense control
    case add_expense:
      return {
        ...state,
        expensesList: state.expensesList.concat(action.recentExpense),
      };
    case delete_expense:
      return {
        ...state,
        expensesList: state.expensesList.filter(
          ({ id }) => id !== action.toDeleteExpenseID
        ),
      };
    case get_to_edit_expense:
      return {
        ...state,
        toEditExpense: { ...action.toEditExpense },
      };
    case edit_expense: {
      const newArr = [...state.expensesList];
      let test =
        newArr[
          state.expensesList.findIndex(
            ({ id }) => id === action.editedExpense.id
          )
        ];
      const deductedPrevToCurr = action.currCost - action.prevCost;
      test.cost = action.editedExpense.cost;
      test.item = action.editedExpense.item;
      updatedUser.expensesList = newArr;
      // update expences after the edit
      updatedUser.totalExpense += deductedPrevToCurr;
      updatedUser.totalFunds -= deductedPrevToCurr;
      return {
        ...state,
        user: updatedUser,
      };
    }
    // balance
    case deposit: {
      totalFunds += action.deposit;
      updatedUser.totalFunds = totalFunds;
      return {
        ...state,
        user: updatedUser,
      };
    }
    case withdraw: {
      totalFunds -= action.withdraw;
      updatedUser.totalFunds = totalFunds;
      return {
        ...state,
        user: updatedUser,
      };
    }
    case get_total_expense: {
      updatedUser.totalExpense = state.expensesList
        .map(({ cost }) => cost)
        .reduce((prev, curr) => prev + curr);
      return {
        ...state,
        user: updatedUser,
      };
    }
    case subtract_expense_to_funds: {
      totalFunds -= state.totalExpense;
      updatedUser.totalFunds = totalFunds;
      return {
        ...state,
        user: updatedUser,
      };
    }
    case subtract_recent_cost_to_funds: {
      totalFunds -= action.cost;
      updatedUser.totalFunds = totalFunds;
      return {
        ...state,
        user: updatedUser,
      };
    }
    case add_recent_cost_to_total_expense: {
      totalExpense += action.cost;
      updatedUser.totalExpense = totalExpense;
      return {
        ...state,
        user: updatedUser,
      };
    }

    case add_deleted_cost_to_funds: {
      totalFunds += action.cost;
      updatedUser.totalFunds = totalFunds;
      return {
        ...state,
        user: updatedUser,
      };
    }

    case subtract_deleted_cost_to_expense: {
      totalExpense -= action.cost;
      updatedUser.totalExpense = totalExpense;
      return {
        ...state,
        user: updatedUser,
      };
    }
    // user
    case add_user:
      return {
        ...state,
        accounts: state.accounts.concat(action.account),
      };
    case set_user:
      return {
        ...state,
        user: { ...action.user },
      };
    case toggle_login:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    case update_accounts: {
      const toUpdateAccount = state.accounts.filter(
        ({ email }) => email === action.updatedUser.email
      );
      const array = [...state.accounts];
      array[array.indexOf(toUpdateAccount[0])] = action.updatedUser;
      return {
        ...state,
        accounts: array,
      };
    }
    case set_expense_list:
      return {
        ...state,
        expensesList: action.expensesList,
      };
    case delete_account:
      return {
        ...state,
        accounts: state.accounts.filter(({ id }) => id !== action.id),
      };
    case send_funds: {
      const accounts = [...state.accounts];
      const accountToSendFundsArray = state.accounts.filter(
        ({ id }) => id === action.id
      );
      const accountToSendFunds = accountToSendFundsArray[0];

      accounts[accounts.indexOf(accountToSendFunds)].totalFunds +=
        action.amount;
      return {
        ...state,
        accounts: accounts,
      };
    }
    case subtract_sent_amount: {
      totalFunds -= action.amount;
      updatedUser.totalFunds = totalFunds;
      return {
        ...state,
        user: updatedUser,
      };
    }
    case update_stats: {
      const newExpenseListTotal = parseInt(
        action.expensesList
          .map(({ cost }) => cost)
          .reduce((prev, curr) => prev + curr)
      );
      updatedUser.totalExpense = newExpenseListTotal;
      updatedUser.totalFunds -= newExpenseListTotal;
      return {
        ...state,
        user: updatedUser,
      };
    }

    default:
      return {
        ...state,
      };
  }
};
