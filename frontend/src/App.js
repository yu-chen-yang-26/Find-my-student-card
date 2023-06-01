import "./App.css";
import Homepage from "./container/Homepage/Homepage";
import Detail from "./container/Detail/Detail";
import Heatmap from "./container/Heatmap/Heatmap";
import Upload from "./container/Uploadpage/Uploadpage";
import Login from "./container/Login/Login";
import Register from "./container/Register/Register";
import ForgotPassword from "./container/ForgotPassword/ForgotPassword";
import Settings from "./container/Settings/Settings";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/detail/:id/:time" element={<Detail />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/announcement" element={<Upload />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/HeatMap" element={<Heatmap />} />
      </Routes>
    </Router>
  );
}

export default App;
