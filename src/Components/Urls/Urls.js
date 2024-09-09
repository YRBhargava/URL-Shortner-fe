import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import axios from "axios";

const demoList = [
  ["d1", "d2"],
  ["d3", "d4"],
  ["d5", "d5"],
];
export default function Urls() {

    const [urls,setUrls]=useState([])
    const handleSetUrls=(urlList)=>{
        setUrls(urlList)
    }

    const fetchUrlHistory=async()=>{
        const accessToken=window.localStorage.getItem('accessToken')
        let response=null
        const userId=window.localStorage.getItem('userId')

        //---------------------Endpoint for hitting URL History API---------------
        try{
            response=await axios.get(`http://127.0.0.1:8001/urlsHistory/${userId}/`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }
            )
            handleSetUrls(response.data.urlsHistory)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchUrlHistory()
    },[])
  return (
    <Box sx={{ flexGrow: 1 } }>
        <Typography variant="h5" align="center">URLs History</Typography>
      <Grid container spacing={2} marginTop={'20px'}>
      <Grid item xs={2} textAlign={"left"} fontSize={'20px'}>
          #
        </Grid>
        <Grid item xs={5} textAlign={"left"} fontSize={'20px'}>
          Original Url
        </Grid>
        <Grid item xs={5} textAlign={"left"} fontSize={'20px'}>
          Short Url
        </Grid>
        {urls.map((item, index) => (
          <React.Fragment key={index}>
            <Grid item xs={2}>
                {index+1}
            </Grid>
          <Grid item xs={5} textAlign={"left"} sx={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>
              <a href={item[0]} style={{ color: 'black', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">{item[0]}</a>
          </Grid>
          <Grid item xs={5} textAlign={"left"} sx={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>
              <a href={'http://localhost:8001/s/'+item[1]} style={{ color: 'black', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">{'http://localhost:8001/s/'+item[1]}</a> 
          </Grid>
      </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
}
