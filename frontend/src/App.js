import logo from './logo.svg';
import './App.css';
import styled from "styled-components"
import Homepage from './container/Homepage';
import Detail from './container/Detail';
import Upload from './container/Uploadpage';
import BG from './components/BGpic';
import Login from './container/Login';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
  <Router>
    <Routes>
    {/* <Upload/> */}
      <Route path="/detail" element={<Detail/>} />
      <Route path="/home" element={<Homepage/>} />
      <Route path="/upload" element={<Upload/>} />
      <Route path="/" element={<Login/>} />
    </Routes>
  </Router> 

  );
}

export default App;
