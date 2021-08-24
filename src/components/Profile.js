//React
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom"

import { useDispatch, useSelector } from 'react-redux'

//Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import Brightness3Icon from '@material-ui/icons/Brightness3';
import GroupIcon from '@material-ui/icons/Group';

//React Bootstrap imports
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.css';

//Image imports
// import cardBack from '../images/card-back.jpeg'
import cardBack from '../images/AReverseCard.PNG'

//Component-specific font theme and styling
const fontTheme = createTheme({
    typography: {
      fontFamily: [
        'Cairo',
      ].join(','),
    },
  });

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop: theme.spacing(2),      
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 1000,
      maxHeight: 580,
    },
    image: {
      width: 330,
      height: 550,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    thumbnail: {
        height: 40,
        width: 40,
    },
    back: {
        margin: theme.spacing(1, 0, 2),
        backgroundColor: "black",
        color: "white",
        marginLeft: theme.spacing(4),
    },
    spinner: {
        position: 'absolute',
        left: 620,
        right: 0,
        top: 340,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    h1: {
        marginTop: theme.spacing(3),  
        marginLeft: theme.spacing(4),    
    },
    h2: {
        marginTop: theme.spacing(1),  
        marginLeft: theme.spacing(4),    
    },
    h3: {
        marginTop: theme.spacing(1),   
        marginLeft: theme.spacing(4),   
    },
    icon: {
        height: 250,
        width: 250,
        marginRight: theme.spacing(2)
    }
  }));

function Profile() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.loggedInUser)
    const username = useSelector(state => state.usernameInput)
    const personalProfileToggledOn = useSelector(state => state.personalProfileToggledOn)

    const [card, setCard] = useState(null);
    const [checked, setChecked] = React.useState(true);

    const { id } = useParams()
    const history = useHistory();
    const classes = useStyles();

    return (
        <>
        <div className={classes.root}>
            <ThemeProvider theme={fontTheme}>
            <Fade in={checked}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    { personalProfileToggledOn ? 
                                    // <Typography gutterBottom variant="subtitle1">
                                    <h1 className={classes.h1} style={{color: "black"}}>
                                        {user.first_name} {user.last_name} | Personal
                                    </h1>
                                    
                                    :
                                    <h1 className={classes.h1} style={{color: "black"}}>
                                        {user.first_name} {user.last_name} | Public
                                    </h1>
                                    }
                                    {/* <Typography variant="body2" gutterBottom> */}
                                    <h2 className={classes.h2}>
                                        Username: {username}
                                    </h2>
                                    {/* </Typography> */}
                                    {/* <Typography variant="body2" color="textSecondary"> */}
                                    <h3 className={classes.h3}>
                                        {user.email}
                                    </h3>    
                                    {/* </Typography> */}
                                    <Button onClick={() => history.goBack()} className={classes.back}>
                                        Edit
                                    </Button>
                                </Grid>
                            </Grid>
                            {/* <Grid item>
                                <Typography variant="subtitle1"> <img className={classes.thumbnail} src={card.suit_thumbnail} /></Typography>
                            </Grid> */}
                        </Grid>
                        { personalProfileToggledOn ? 
                        <Grid item>
                            {/* <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={cardBack} />
                            </ButtonBase> */}
                            <Brightness3Icon className={classes.icon}></Brightness3Icon>
                        </Grid>
                        :
                        <Grid item>
                            {/* <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={cardBack} />
                            </ButtonBase> */}
                            <GroupIcon className={classes.icon}></GroupIcon>
                        </Grid>
                        }   
                    </Grid>
                </Paper>
            </Fade>
            </ThemeProvider>
        </div>
        </>
    )

}

export default Profile