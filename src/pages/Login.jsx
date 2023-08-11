import { useState } from 'react';
import { Box, FormControl, Typography, Button, TextField, InputAdornment, Input, InputLabel, IconButton, useTheme } from '@mui/material';
import { tokens } from "../theme";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import supabase2 from '../supabase2';
import logo from "../assets/profile.png"
import svg from "../assets/login.svg"
import useMediaQuery from "@mui/material/useMediaQuery";



const Login = ({ setToken }) => {
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isnonmoblie = useMediaQuery('(min-width : 900px)');

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [formData, setFormData] = useState({
    email: '', password: ''
  })

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
      const { data, error } = await supabase2.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) throw error
      console.log(data)
      setToken(data)
      navigate('/home')


    } catch (error) {
      alert(error)
    }
  }




  return (
    <Box
      display="grid"
      gridTemplateColumns={!isnonmoblie ? "1fr" : "1fr 1fr"}
      justifyContent="center"
      alignItems={"center"}
      m="10px"
    >
      <Box
      display={!isnonmoblie ? "none" : "flex"}
      justifyContent="center"
      alignItems="center"
      >
        <img width="92%" height="92%" src={svg} alt="" />
      </Box>
      <Box
        display="grid"
        gridTemplateRows="repeat(3, 1fr)"
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
            Welcome Back
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gridTemplateRows="repeat(3, 1fr)"
            justifyContent="center"
            alignItems="center"
            gridArea="2 / 1 / 3 / 2"
          >
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
                  m: 1, width: '30ch',
                  '&:active': {
                    color: colors.blueAccent[600],
                  },
                }}
                onChange={handleChange}
              />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <LockIcon sx={{ color: 'action.active', mr: 1, my: 1 }} />
              <FormControl sx={{ m: 1, width: '30ch' }} variant="standard">
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
            <Box
              gridArea="3 / 1 / 4 / 2"
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
                Login
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
            Doesn't have a Account? &nbsp;
            <Link
              style={{ textDecoration: "none", color: colors.blueAccent[500] }}
              to="/signup"
            >
              Sign Up
            </Link>
          </Typography>
        </Box>




      </Box>
    </Box>
  )
}

export default Login