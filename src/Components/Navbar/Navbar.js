import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import PersonIcon from "@mui/icons-material/Person";
import Urls from "../Urls/Urls";
import toast from "react-hot-toast";
import { Grid } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const UrlStyle = {
  position: "absolute",
  maxHeight: "70vh",
  overflowY: "auto",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Navbar(props) {
  const { isLogin, toggleisLogin } = props;
  const [name, setName] = useState(window.localStorage.getItem("name"));
  const [openLogin, setOpenLogin] = React.useState(false);
  const handleSetName = (targetName) => {
    setName(targetName);
  };
  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);
  const [openSignup, setOpenSignup] = React.useState(false);
  const handleOpenSigup = () => setOpenSignup(true);
  const handleCloseSignup = () => setOpenSignup(false);
  const [openUrls, setOpenUrls] = useState(false);
  const handleOpenUrls = () => setOpenUrls(true);
  const handleCloseUrls = () => setOpenUrls(false);
  const handleSignOut = () => {
    window.localStorage.setItem("isLoggedIn", "no");
    window.localStorage.setItem("userId", "null");
    toggleisLogin("no");
    toast.success("Signed Out!");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                URL-Shortner
              </Typography>
            </Grid>
            <Grid item xs={8} alignItems={"center"}>
              <Typography
                variant="h10"
                component="div"
                sx={{ flexGrow: 1, textAlign: "center" }}
              >
                {isLogin === "yes" ? (
                  <Button color="inherit" onClick={handleOpenUrls}>
                    URLs
                  </Button>
                ) : null}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              {isLogin === "no" ? (
                <div style={{display:'flex', justifyContent:'space-between'}}>
                  <Button color="inherit" onClick={handleOpenLogin}>
                    Login
                  </Button>
                  <Button color="inherit" onClick={handleOpenSigup}>
                    Signup
                  </Button>
                </div>
              ) : (
                <div
                  style={{ display: "flex", justifyContent:'space-evenly' , alignContent:'center'}}
                >
                  <div style={{display:'flex', justifyContent:'flex-start'}}>
                  <div>
                    <PersonIcon />
                  </div>
                  
                  
                  <div >{name}</div>
                  </div>
                  <div>
                    <Button color="inherit" onClick={handleSignOut}>
                      SignOut
                    </Button>
                  </div>
                  </div>
                
              )}
            </Grid>
          </Grid>

          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            URL-Shortner
          </Typography> */}
          {/* <Typography variant="h10" component="div" sx={{ flexGrow: 1}}>
            {
              isLogin==='yes'?(<Button color="inherit" onClick={handleOpenUrls}>URLs</Button>):null
            }
          </Typography> */}

          {/* {
            isLogin==='no'?(
                <>
                <Button color="inherit" onClick={handleOpenLogin}>Login</Button>
                <Button color="inherit" onClick={handleOpenSigup}>Signup</Button>
                </>
            ):(
              
                <div style={{display:'flex', paddingLeft:'0', width:'20vw'}}>
                  <div>
                  <PersonIcon/>
                  </div>
                  
                  <div style={{paddingTop:'4px'}}>
                    {name}
                  </div>
                  <div style={{paddingRight:'0', marginLeft:'0'}}>
                  <Button color="inherit" onClick={handleSignOut}>SignOut</Button>
                  </div>
                    
                </div>
              
            )
          } */}
        </Toolbar>
      </AppBar>
      <Modal
        open={openLogin}
        onClose={handleCloseLogin}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Login
            stateChanger={handleCloseLogin}
            isLoginChanger={toggleisLogin}
            nameChanger={handleSetName}
          />
        </Box>
      </Modal>
      <Modal
        open={openUrls}
        onClose={handleCloseUrls}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock={true}
      >
        <Box sx={UrlStyle}>
          <Urls stateChanger={handleCloseUrls} />
        </Box>
      </Modal>
      <Modal
        open={openSignup}
        onClose={handleCloseSignup}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Signup />
        </Box>
      </Modal>
    </Box>
  );
}
