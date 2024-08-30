import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import WelcomeSide from "../../Components/WelcomeSide/WelcomeSide"; 
import Shortner from "../../Components/Shortner/Shortner";
import './Home.css'
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";


export default function Home() {
  const [isLogin, toggleisLogin] = useState("no");

  useEffect(()=>{
    const userId=window.localStorage.getItem('userId')
    const isLoggedIn=window.localStorage.getItem('isLoggedIn')
    toggleisLogin(isLoggedIn)
  })
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Navbar isLogin={isLogin} toggleisLogin={toggleisLogin} />
          </Grid>
          <Grid item xs={4} style={{ height: "80vh" }}>
            <WelcomeSide/>
          </Grid>
          <Grid item xs={8}>
            <Shortner />
          </Grid>
          <Grid item xs={12} style={{ height: "11vh" }}>
            <div className="outerDiv">
            <div className="footer">
              <p className="tag">URL Shortner @2024</p>
              <p className="madeBy">Yashraj Bhargava</p>
            </div>
            </div>
          </Grid>
        </Grid>
      </Box>
      
    </div>
  );
}
