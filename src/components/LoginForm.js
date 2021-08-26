//React
import React, { useState } from "react";
import { useHistory } from "react-router-dom"

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { changeUsernameInput, changePasswordInput, setLoggedInUser } from '../store/reducers/reducerSlice'

// Material UI imports
import "@fontsource/cairo"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@material-ui/core/styles'

//Image imports
import Image1 from "../images/Login-gallery/gallery-1.jpeg"
import Image2 from "../images/Login-gallery/gallery-2.jpeg"
import Image3 from "../images/Login-gallery/gallery-3.jpeg"
import Image4 from "../images/Login-gallery/gallery-4.jpeg"
import Image5 from "../images/Login-gallery/gallery-5.jpeg"
import avatar from "../images/icons/sign-in-icon-3.png"
const backgroundImages = [Image1, Image2, Image3, Image4, Image5]


//Component-specific font theme and styling
const fontTheme = createTheme({
    typography: {
      fontFamily: [
        'Cairo',
      ].join(','),
    },
  });

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      //Random image generated from images folder upon page refresh
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
      '& label.Mui-focused': {
        color: 'black',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'black',
        },
        '&:hover fieldset': {
          borderColor: 'black',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'black',
        },
      },
      width: '100%', 
      marginTop: theme.spacing(1),
      color: "black",
      focused: "black",
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: "black",
      color: "white",
    },
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        marginBottom: theme.spacing(2)
    },
    hyperlink: {
        color: "black"
    },
  }));



function LoginForm() {
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const classes = useStyles();
    const history = useHistory();
    
    // Redux
    const dispatch = useDispatch();
    const usernameInput = useSelector(state => state.usernameInput)
    const passwordInput = useSelector(state => state.passwordInput)

    const handleUsernameChange = (e) => {
      dispatch(changeUsernameInput(e.target.value))
    }
    
    const handlePasswordChange = (e) => {
      dispatch(changePasswordInput(e.target.value))
    }
    
    const handleSubmit = (e) => {
      e.preventDefault()
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
        <ThemeProvider theme={fontTheme}>
        <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar src={avatar} className={classes.large} />
                    <Typography component="h1" variant="h5">
                        Arcadia Daily Tarot
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"                      
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
                                <Link href="/signup" variant="body2" className={classes.hyperlink}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
            </ThemeProvider>
        </Grid>            
        </>
    )
}

export default LoginForm