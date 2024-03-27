import "./App.css";
import Signin from "../src/page/Signin";
import Attendance from "./page/Attendance";
import Navbar from "./page/Navbar";
import Signup from "./page/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./Utils/PrivateRoute.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Attendance />} />
          </Route>


          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
