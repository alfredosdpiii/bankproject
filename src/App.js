import Nav from "./Components/Nav";
import ManageExpenses from "./Components/Expenses/ManageExpenses";
import { TransactionContextProvider } from "./States/TransactionContext";
import { initialState, reducer } from "./States/reducer";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Signup from "./Components/Auth/Signup";
import Login from "./Components/Auth/Login";
import PrivateRoute from "./Components/Route/PrivateRoute";
import { ChakraProvider } from "@chakra-ui/react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function App() {
  toast.configure();
  return (
    <TransactionContextProvider initialState={initialState} reducer={reducer}>
      <ChakraProvider>
        <BrowserRouter>
          <div>
            <div>
              <Routes>
                <Route path="bankproject" element={<Login />} />

                <Route
                  path="bankproject/account"
                  element={
                    <PrivateRoute>
                      <Nav />
                      <ManageExpenses />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/bankproject/account/users"
                  element={
                    <PrivateRoute>
                      <Nav />
                    </PrivateRoute>
                  }
                />
                <Route path="login" element={<Login />} />
                <Route path="/bankproject/signup" element={<Signup />} />

                <Route
                  path="*"
                  element={
                    <main style={{ padding: "1rem" }}>
                      <p>Bonk! There's nothing here!</p>
                    </main>
                  }
                />
              </Routes>
              <Outlet />
            </div>
          </div>
        </BrowserRouter>
      </ChakraProvider>
    </TransactionContextProvider>
  );
}

export default App;
