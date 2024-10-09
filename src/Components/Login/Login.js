import React, { useState } from "react";
import Sheet from "@mui/joy/Sheet";
import CssBaseline from "@mui/joy/CssBaseline";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login({stateChanger,isLoginChanger,nameChanger}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnEmailChange = (targetEmail) => {
    setEmail(targetEmail);
  };

  const handleOnPasswordChange = (targetPassword) => {
    setPassword(targetPassword);
  };

  const handleOnLoginClick = async () => {
    if (email == "" || password == "") {
      toast.error("All fields required!");
      return;
    }
    const requestBody = {
      email: email,
      password: password,
    };
    let response = null;
    //----------------------------HIT LOGIN API HERE-------------------------------------------
    try {
      response = await axios.post(`${process.env.REACT_APP_API_URL}login/`, requestBody);
      console.log(response)
      if (response.status == 200) {
        toast.success(response.data.message);
        stateChanger()
        isLoginChanger()
        nameChanger(response.data.name)
        window.localStorage.setItem('accessToken',response.data.access_token)
        window.localStorage.setItem('isLoggedIn','yes')
        window.localStorage.setItem('userId',response.data.userId)
        window.localStorage.setItem('name',response.data.name)
        
      } 
      // else {
      //   toast.error(response.data.message);
      // }
    } catch (error) {
      console.log(error)
      toast.error("Something is wrong! Please try again");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <main>
      <CssBaseline />
      <Sheet
        sx={{
          width: 300,
          mx: "auto", 
          my: 4, 
          py: 3, 
          px: 2, 
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "sm",
          boxShadow: "md",
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1" style={{ textAlign: "center" }}>
            <b>Welcome!</b>
          </Typography>
        </div>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="johndoe@email.com"
            onChange={(e) => handleOnEmailChange(e.target.value)}
            value={email}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="password"
            onChange={(e) => handleOnPasswordChange(e.target.value)}
            value={password}
          />
        </FormControl>
        <Button sx={{ mt: 1 /* margin top */ }} onClick={handleOnLoginClick}>
          Log in
        </Button>
      </Sheet>
    </main>
  );
}
