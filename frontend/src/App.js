import "./App.css";
import Homepage from "./container/Homepage";
import Detail from "./container/Detail";
import Heatmap from "./container/Heatmap";
import Upload from "./container/Uploadpage";
import Login from "./container/Login";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/detail/:id/:time" element={<Detail />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/upload/:currentStep" element={<Upload />} />
        <Route path="/" element={<Login />} />
        <Route path="/HeatMap" element={<Heatmap />} />
      </Routes>
    </Router>
  );
}

export default App;
