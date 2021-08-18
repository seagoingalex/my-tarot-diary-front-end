import React, { useState } from "react";
import { useHistory } from "react-router-dom"

import { Provider, useDispatch, useSelector } from 'react-redux'
import { changeUsernameInput, changePasswordInput, setLoggedInUser } from '../store/reducers/reducerSlice'

// Material UI imports

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Image1 from "../images/gallery-1.jpeg"
import Image2 from "../images/gallery-2.jpeg"
import Image3 from "../images/gallery-3.jpeg"
import Image4 from "../images/gallery-4.jpeg"
import Image5 from "../images/gallery-5.jpeg"

const backgroundImages = [Image1, Image2, Image3, Image4, Image5]

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
        // backgroundImage: `url(${Image1})`,
    //   backgroundImage: 'url(src/images/gallery-1.jpeg)',
      backgroundImage: `url(${backgroundImages[Math.floor(Math.random() * backgroundImages.length)]})`,
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

function LoginForm() {
    const classes = useStyles();
    
    const dispatch = useDispatch();
    const usernameInput = useSelector(state => state.usernameInput)
    const passwordInput = useSelector(state => state.passwordInput)
    const loggedInUser = useSelector(state => state.loggedInUser)

    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    const handleUsernameChange = (e) => {
        // console.log(e)
        dispatch(changeUsernameInput(e.target.value))
        // dispatch({ type: "CHANGE_USERNAME_INPUT", payload: e.target.value })
      }
    
      const handlePasswordChange = (e) => {
        // console.log(e)
        dispatch(changePasswordInput(e.target.value))
        // dispatch({ type: "CHANGE_PASSWORD_INPUT", payload: e.target.value })
      }
    
      const handleSubmit = (e) => {
        e.preventDefault()
        console.log (usernameInput, passwordInput)
        setIsLoading(true)
        
        async function login() {
            const res = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ usernameInput, passwordInput }),
            })
            if(res.ok){
                setIsLoading(false);
                const user = await res.json()
                dispatch(setLoggedInUser(user))
                history.push("/")
            } else {
                setIsLoading(false);
                window.alert("Invalid username and/or password. Please try again.")
            }
        }
        login();
      }


    return (
        <>

<Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={handleUsernameChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isLoading ? "Loading..." : "Sign in"}
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              {/* <Copyright /> */}
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>




        </>
    )

}

export default LoginForm