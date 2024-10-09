import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography, unstable_composeClasses } from "@mui/material";
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
        console.log("entryyy")
        const accessToken=window.localStorage.getItem('accessToken')
        console.log("eeeeeeeee--",accessToken)
        let response=null
        const userId=window.localStorage.getItem('userId')

        //---------------------Endpoint for hitting URL History API---------------
        try{
            response=await axios.get(`${process.env.REACT_APP_API_URL}urlsHistory/${userId}/`,
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

            </Grid>
          <Grid item xs={5} textAlign={"left"} sx={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>
              <a href={item[0]} style={{ color: 'black', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">{item[0]}</a>
          </Grid>
          <Grid item xs={5} textAlign={"left"} sx={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>
              <a href={`${process.env.REACT_APP_API_URL}s/`+item[1]} style={{ color: 'black', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">{`${process.env.REACT_APP_API_URL}s/`+item[1]}</a> 
          </Grid>
      </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
}
