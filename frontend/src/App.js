import logo from './logo.svg';
import './App.css';
import styled from "styled-components"
import Homepage from './container/Homepage';
import Detail from './container/Detail';
import Upload from './container/Uploadpage';
import BG from './components/BGpic';
import Login from './container/Login';
import { useState } from 'react';


function App() {
  const [home,setHome] = useState(false)
  const [info,setInfo] = useState(false)
  const [upload, setUpload] = useState(false)
  return (
  <>
    {/* <Upload/> */}
    { 
      info?<Detail setInfo={setInfo}/>:
      home?<Homepage setUpload={setUpload} setHome={setHome}/>:
      upload?<Upload setInfo={setInfo} setHome={setHome}/>:<Login setHome = {setHome}/>
    }
    
  </> 

  );
}

export default App;
