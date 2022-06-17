import React, { useState } from 'react'
import './App.css';
import SideBar from './Components/SideBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Routes/Home'
import Ratings from './Routes/Ratings'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import axios from 'axios';
import {
  makeStyles,
} from "@material-ui/core";



const useStyles = makeStyles((theme) => ({


  containerWidth:
  {
    width: `calc(100% - 240px)`,
    marginTop: '85px',
    top: '85px'
  },
}))
function App() {

  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (typeof window !== 'undefined') {
    // Perform localStorage action
    const item = localStorage.getItem('token')

    axios.defaults.headers.common['Authorization'] = `Bearer ${item}`;
  }
  const classes = useStyles();

  return (
    <>
      <BrowserRouter>
        <div style={{ display: 'flex' }}>

          <SideBar
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClose={handleDrawerClose}
            open={open}
          />
          <div className={`${classes.containerWidth}`} style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home open={open}/>} />
              <Route path="/Ratings" element={<Ratings />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
