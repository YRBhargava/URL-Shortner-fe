import React from "react";
import Box from "@mui/material/Box";
import logo from './logo.png';
import { Grid, Typography } from "@mui/material";

export default function WelcomeSide() {
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Box sx={{ width: '100%', height: '100%' }}>
      <Grid
        container
        direction="column"
        sx={{ height: '100%' }}
      >
        <Grid
          item
          sx={{
            height: '30%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
         <Typography variant="h3" style={{alignSelf:'end'}}>Welcome!</Typography>
        </Grid>
        <Grid
          item
          sx={{
            height: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding:'0'
          }}
        >
          <img src={logo} alt="example" style={{ maxHeight: '100%', maxWidth: '100%' , alignSelf:'baseline'}} ></img>
        </Grid>
      </Grid>
    </Box>
  </div>
  );
}
