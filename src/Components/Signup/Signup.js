import React, { useState } from 'react'
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Signup() {

    const [email,setEmail]=useState('')
    const [name,setName]=useState('')
    const [phone,setPhone]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')

    const handleOnEmailChange=(targetEmail)=>{
        setEmail(targetEmail)
    }

    const handleOnNameChange=(targetName)=>{
        setName(targetName)
    }

    const handleOnPhoneChange=(targetPhone)=>{
        setPhone(targetPhone)
    }

    const handleOnPasswordChange=(targetPassword)=>{
        setPassword(targetPassword)
    }

    const handleOnConfirmPasswordChange=(targetPassword)=>{
        setConfirmPassword(targetPassword)
    }

    const handleOnSignupClick=async()=>{
        if(password!=confirmPassword){
            setPassword('')
            setConfirmPassword('')
            toast.error('Passwords do not match!')
            return
        }
        if(name==''||email==''||phone==''){
            toast.error("All fields required!")
            return
        }
        const requestBody={
            'email':email,
            'name':name,
            'phone':phone,
            'password':password
        }

        let response=null
        //-----------------------------HIT SIGNUP API HERE----------------------------------------------------
        try{
            response= await axios.post('http://127.0.0.1:8001/signup/',requestBody)
            console.log(response)
        
            if(response.status==200){
                toast.success(response.data.message)
            }
            else{
                toast.error(response.data.message)
            }
        }catch(error){
            toast.error(error.response.data.message)
        }
        
        setEmail('')
        setName('')
        setPhone('')
        setPassword('')
        setConfirmPassword('')
    }

  return (
    <main>
    <CssBaseline />
    <Sheet
      sx={{
        width: 300,
        mx: 'auto', 
        my: 4, 
        py: 3, 
        px: 2, 
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: 'sm',
        boxShadow: 'md',
      }}
      variant="outlined"
    >
      <div>
        <Typography level="h4" component="h1" style={{textAlign:'center'}}>
          <b>Welcome!</b>
        </Typography>
      </div>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          type="email"
          placeholder="example@abc.com"
          onChange={(e)=>handleOnEmailChange(e.target.value)}
          value={email}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          name="name"
          type="text"
          placeholder="fname lname"
          onChange={(e)=>handleOnNameChange(e.target.value)}
          value={name}
        />
      </FormControl>

      
      <FormControl>

        
        <FormLabel>Phone Number</FormLabel>
        <Input
          name="phone"
          type="phone"
          placeholder="+91-xxxxxxxxxx"
          onChange={(e)=>handleOnPhoneChange(e.target.value)}
          value={phone}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e)=>handleOnPasswordChange(e.target.value)}
          value={password}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={(e)=>handleOnConfirmPasswordChange(e.target.value)}
          value={confirmPassword}
        />
      </FormControl>
      <Button sx={{ mt: 1 }} onClick={handleOnSignupClick}>SignUp</Button>
    </Sheet>
  </main>
  )
}
