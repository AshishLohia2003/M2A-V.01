import React, { useState } from 'react';
import { Box, FormControl, Typography, Button, TextField, InputAdornment, Input, InputLabel, IconButton, useTheme } from '@mui/material';
import { tokens } from "../theme";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import StorageIcon from '@mui/icons-material/Storage';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import logo from "../assets/profile.png"
import svg from "../assets/login.svg"
import { Link } from 'react-router-dom';
import supabase2 from '../supabase2';
import useMediaQuery from "@mui/material/useMediaQuery";


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:900px)");


  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    databaseUrl: '',
    apiKey: '',
  });


  console.log(formData)

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }

    })

  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const { data, error } = await supabase2.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            database_url: formData.databaseUrl,
            api_key: formData.apiKey,
          },
        },
      });

      if (error) throw error
      alert('Check your email for verification link')


    } catch (error) {
      alert(error)
    }
  }




  return (
    // <div>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       placeholder='Fullname'
    //       name='fullName'
    //       onChange={handleChange}
    //     />

    //     <input
    //       placeholder='Email'
    //       name='email'
    //       onChange={handleChange}
    //     />

    //     <input
    //       placeholder='Password'
    //       name='password'
    //       type="password"
    //       onChange={handleChange}
    //     />

    //     <input
    //       placeholder='Database URL'
    //       name='databaseUrl'
    //       onChange={handleChange}
    //     />

    //     <input
    //       placeholder='API Key'
    //       name='apiKey'
    //       onChange={handleChange}
    //     />


    //     <button type='submit'>
    //       Submit
    //     </button>


    //   </form>
    //   Already have an account?<Link to='/'>Login</Link>
    // </div>

    <Box
      display="grid"
      gridTemplateColumns={!isNonMobile ? "1fr" : "1fr 1fr"}
      alignItems="center"
      justifyContent="center"
      m="10px"
    >

      <Box
        display="grid"
        alignItems="center"
      >
        <Box
          display="grid"
          justifyContent="center"
          alignItems="center"
          gridArea=" 1 / 1 / 2 / 2"
        >
          <Box
            textAlign="center"
          >
            <img style={{
              width: "40%",
              height: "40%",
              borderRadius: "50%",
              backgroundColor: colors.grey[100]

            }}
              src={logo}
              alt="logo"
            />
          </Box>
          <Typography textAlign="center" variant="h3" color={colors.blueAccent[500]}>
            Create Account
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gridTemplateRows="repeat(6, 1fr)"
            justifyContent="center"
            alignItems="center"
            gridArea="2 / 1 / 3 / 2"
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountCircleIcon sx={{ color: 'action.active', mr: 1, my: 1 }} />
              <TextField
                autoComplete='username'
                type='text'
                label="Username"
                name='fullname'
                variant="standard"
                placeholder='XYZ'
                sx={{
                  m: 1, width: '40ch',
                  '&:active': {
                    color: colors.blueAccent[600],
                  },
                }}
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <EmailIcon sx={{ color: 'action.active', mr: 1, my: 1 }} />
              <TextField
                autoComplete='email'
                type='email'
                label="Email Address"
                name='email'
                variant="standard"
                placeholder='test@gmail.com'
                sx={{
                  m: 1, width: '40ch',
                  '&:active': {
                    color: colors.blueAccent[600],
                  },
                }}
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <StorageIcon sx={{ color: 'action.active', mr: 1, my: 1 }} />
              <TextField
                autoComplete='off'
                type='text'
                label="Database Url"
                name='databaseUrl'
                variant="standard"
                sx={{
                  m: 1, width: '40ch',
                  '&:active': {
                    color: colors.blueAccent[600],
                  },
                }}
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <VpnKeyIcon sx={{ color: 'action.active', mr: 1, my: 1 }} />
              <TextField
                autoComplete='off'
                type='text'
                label="Api Key"
                name='apiKey'
                variant="standard"
                sx={{
                  m: 1, width: '40ch',
                  '&:active': {
                    color: colors.blueAccent[600],
                  },
                }}
                onChange={handleChange}
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <LockIcon sx={{ color: 'action.active', mr: 1, my: 1 }} />
              <FormControl sx={{ m: 1, width: '40ch' }} variant="standard">
                <InputLabel
                  htmlFor="standard-adornment-password"
                >
                  Password
                </InputLabel>
                <Input
                  onChange={handleChange}
                  autoComplete='current-password'
                  id="standard-adornment-password"
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <LockIcon sx={{ color: 'action.active', mr: 1, my: 1 }} />
              <FormControl sx={{ m: 1, width: '40ch' }} variant="standard">
                <InputLabel
                  htmlFor="standard-adornment-password"
                >
                  Confirm Password
                </InputLabel>
                <Input
                  onChange={handleChange}
                  autoComplete='current-password'
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
            <Box

            >
              <Button
                sx={{
                  width: "100%",
                  background: colors.blueAccent[700],
                  '&:hover': {
                    backgroundColor: colors.blueAccent[600],
                  },
                }}
                variant="contained"
                type='submit'
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </form>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h5" color={colors.grey[100]}>
            Already have a Account? &nbsp;
            <Link
              style={{ textDecoration: "none", color: colors.blueAccent[500] }}
              to="/"
            >
              Login
            </Link>
          </Typography>
        </Box>




      </Box>
      <Box
      display={!isNonMobile ? "none" : "flex"}
      justifyContent="center"
      alignItems="center"
      >
        <img width="92%" height="92%" src={svg} alt="" />
      </Box>
    </Box>
  )
}

export default SignUp