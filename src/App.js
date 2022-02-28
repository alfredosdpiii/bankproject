import "./App.css";
// import SignUp from "./pages/signup/signup.component";
import Navbar from "./globalComponents/navbar";
import Dashboard from "./pages/dashboard/dashboard.component";
function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <SignUp /> */}
      <Dashboard />
    </div>
  );
}

export default App;
