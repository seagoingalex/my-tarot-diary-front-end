//React
import React, { useState } from "react";
import { useHistory } from "react-router-dom"

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { changeUsernameInput, changePasswordInput, setLoggedInUser } from '../store/reducers/reducerSlice'

// Material UI imports
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createTheme, ThemeProvider } from '@material-ui/core/styles'

//Image imports
import avatar from "../images/icons/sign-in-icon-3.png"

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
    paper: {
      margin: theme.spacing(4, 4),
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
      marginTop: theme.spacing(2),
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
    }
  }));
  

function SignUpForm() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const classes = useStyles();
    const history = useHistory();
    
    // Redux
    const dispatch = useDispatch();
    const usernameInput = useSelector(state => state.usernameInput)
    const passwordInput = useSelector(state => state.passwordInput)
    const loggedInUser = useSelector(state => state.loggedInUser)

    const handleUsernameChange = (e) => {
        console.log(e)
        dispatch(changeUsernameInput(e.target.value))
    }
    
    const handlePasswordChange = (e) => {
        console.log(e)
        dispatch(changePasswordInput(e.target.value))
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([]);
        setIsLoading(true)

        async function signUp() {
            const res = await fetch("http://localhost:3000/signup", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    username: usernameInput,
                    password: passwordInput
                })
            })
            setIsLoading(false);
            if(res.ok) {
                const user = await res.json()
                console.log(user)
                dispatch(setLoggedInUser(user))
                history.push("/about")
            } else {
                const err = await res.json()
                setErrors(err.errors)
            }
        }
        signUp();
      }

    return (
        <>
        <Container component="main" maxWidth="xs">
            <ThemeProvider theme={fontTheme}>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar src={avatar} className={classes.large} ></Avatar>
                <Typography component="h1" variant="h5">
                Sign up
                </Typography>
                <form onSubmit={handleSubmit} className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lname"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            onChange={handleUsernameChange}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handlePasswordChange}
                        />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {isLoading ? "Loading..." : "Sign Up"}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                          <Link href="/" variant="body2" className={classes.hyperlink}>
                              Already have an account? Sign in
                          </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            </ThemeProvider>
        </Container>
        </>
    )
}

export default SignUpForm