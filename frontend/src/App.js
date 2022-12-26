import logo from './logo.svg';
import './App.css';
import styled from "styled-components"
import Homepage from './container/Homepage';
import Detail from './container/Detail';
import Upload from './container/Uploadpage';
import BG from './components/BGpic';
import Login from './container/Login';
import { useState } from 'react';
import { usePage } from './container/hooks/useContext';

function App() {
  const {info, home, upload} = usePage();
  return (
  <>
    {/* <Upload/> */}
    { 
      info?<Detail/>:
      home?<Homepage/>:
      upload?<Upload/>:<Login/>
    }
    
  </> 

  );
}

export default App;
