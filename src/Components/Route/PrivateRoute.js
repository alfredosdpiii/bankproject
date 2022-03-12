import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useTransactionContext } from "../../States/TransactionContext";

export default function PrivateRoute({ children }) {
  const [{ isLoggedIn, user, expensesList }] = useTransactionContext();
  const useAuth = () => {
    return user && isLoggedIn;
  };
  const location = useLocation();
  const auth = useAuth();
  return user.card ? (
    children
  ) : (
    <Navigate to="/bankproject" replace state={{ from: location }} />
  );
}
