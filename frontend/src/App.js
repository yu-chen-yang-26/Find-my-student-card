import "./App.css";
import Homepage from "./container/Homepage/Homepage";
import Detail from "./container/Detail/Detail";
import Upload from "./container/Uploadpage/Uploadpage";
import Login from "./container/Login/Login";
import Register from "./container/Register/Register";
import ForgotPassword from "./container/ForgotPassword/ForgotPassword";
import Settings from "./container/Settings/Settings";
import Mine from "./container/Mine/Mine";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/found" element={<Upload />} />
        <Route path="/lost" element={<Upload />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Settings />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/items" element={<Mine />} />
      </Routes>
    </Router>
  );
}

export default App;
