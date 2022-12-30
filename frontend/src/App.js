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
import { ThemeProvider } from 'react-bootstrap';

function App() {
  const {info, home, upload} = usePage();
  return (
  <>
  <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    minBreakpoint="xxs">
    {/* <Upload/> */}
    { 
      info?<Detail/>:
      home?<Homepage/>:
      upload?<Upload/>:<Login/>
    }
  </ThemeProvider>  
  </> 

  );
}

export default App;
