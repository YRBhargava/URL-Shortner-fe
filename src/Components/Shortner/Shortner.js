import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/joy/Button";
import "./Shortner.css";
import { Grid } from "@mui/material";
import axios from "axios";

export default function Shortner() {
  
  const [utilState, setUtilState] = useState("y");
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleUrl = (targetUrl) => {
    setUrl(targetUrl);
  };

  const handleShortUrl = (targetUrl) => {
    setShortUrl(targetUrl);
  };
  const handleUtilState = () => {
    setUtilState((prevState) => (prevState === "y" ? "n" : "y"));
  };

  const redirectToOriginalUrl = () => {
    window.open(shortUrl, "_blank");
  };

  const handleGoBack = () => {
    handleUtilState();
    handleUrl("");
  };
  const handleOnSubmitClick = async () => {
    const userId = window.localStorage.getItem("userId");
    const accessToken = window.localStorage.getItem("accessToken");
    console.log(accessToken)
    const requestBody = {
      originalUrl: url,
      userId: userId,
    };
    //-------------------------------HIT API TO SHORTEN THE URL--------------------
    let response = null;
    try {
      response = await axios.post(
        `${process.env.REACT_APP_API_URL}shorten/`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      if (response.status == 200) {
        handleUtilState();
        handleShortUrl(response.data.shortUrl);
        toast.success("URL succesfully shortened!");
      } else {
        toast.error("URL already present!");
        handleUrl("");
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };


  return (
    <div className="shortnerWrapper">
      <Card
        variant="outlined"
        sx={{ maxWidth: 500, minWidth: 400, minHeight: 200, maxHeight: 300 }}
      >
        <Box sx={{ p: 2 }}>
          <Stack
            direction="row"
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              align="center"
            >
              Shorten your URL
            </Typography>
          </Stack>
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            Paste your URL below
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 2, flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Paste URL"
                variant="outlined"
                size="small"
                value={url}
                onChange={(e) => {
                  handleUrl(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              {utilState == "y" ? (
                <Button variant="outlined" onClick={handleOnSubmitClick}>
                  Submit
                </Button>
              ) : (
                <>
                  <TextField
                    id="outlined-read-only-input"
                    label="Shortened URL"
                    fullWidth
                    size="small"
                    value={shortUrl}
                    slotprops={{
                      input: {
                        readOnly: true,
                      },
                    }}
                  />
                  <Button
                    variant="outlined"
                    style={{ marginTop: "10px" }}
                    onClick={redirectToOriginalUrl}
                    size="small"
                  >
                    Visit
                  </Button>
                  <Button
                    variant="outlined"
                    style={{ marginTop: "5px" }}
                    size="small"
                    onClick={handleGoBack}
                  >
                    Go Back
                  </Button>
                </>
              )}

            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  );
}
