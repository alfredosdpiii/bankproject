import "./App.css";
// import SignUp from "./pages/signup/signup.component";
import Navbar from "./globalComponents/navbar";
import Dashboard from "./pages/dashboard/dashboard.component";
import { GlobalContextProvider } from "./context/GlobalState";
function App() {
  return (
    <GlobalContextProvider>
      <div className="App">
        <Navbar />
        {/* <SignUp /> */}
        <Dashboard />
      </div>
    </GlobalContextProvider>
  );
}

export default App;
