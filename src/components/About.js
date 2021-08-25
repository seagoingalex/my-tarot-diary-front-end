//React
import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom"

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

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

//React Bootstrap imports
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.css';

//Image imports
// import cardBack from '../images/card-back.jpeg'
// import cardBack from '../images/AReverseCard.PNG'
import cardBack from '../images/card-back.jpeg'

//Component-specific font theme and styling
const fontTheme = createTheme({
    typography: {
      fontFamily: [
        'Cairo',
      ].join(','),
    },
  });

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      marginTop: theme.spacing(2),      
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 1000,
      maxHeight: 640,
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
        marginTop: theme.spacing(-1),  
        marginLeft: theme.spacing(4),    
    },
    h2: {
        marginTop: theme.spacing(0),  
        marginLeft: theme.spacing(4),    
    },
    h3: {
        marginTop: theme.spacing(0),   
        marginLeft: theme.spacing(4),   
    },
    icon: {
        height: 250,
        width: 250,
        marginRight: theme.spacing(2)
    },
    textarea: {
        marginLeft: theme.spacing(4), 
        marginBottom: theme.spacing(1),  
    },
    tabroot: {
        flexGrow: 1,
        marginTop: theme.spacing(-2), 
        marginLeft: theme.spacing(-2), 
        width: 1000,
        backgroundColor: "black",
      },
    
  }));

function About() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.loggedInUser)
    const username = useSelector(state => state.usernameInput)
    const personalProfileToggledOn = useSelector(state => state.personalProfileToggledOn)

    const [card, setCard] = useState(null);
    const [checked, setChecked] = React.useState(true);

    const { id } = useParams()
    const history = useHistory();
    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <>
        <div className={classes.root}>
        <ThemeProvider theme={fontTheme}>
        <Fade in={checked}>
            <Paper className={classes.paper}>
                <AppBar className={classes.tabroot} position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="About Tarot" {...a11yProps(0)} />
                        <Tab label="About the Developer" {...a11yProps(1)} />
                </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                <Grid container spacing={2}>
                        
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    
                                    
                                    <h1 className={classes.h1} style={{color: "black"}}>
                                        Welcome to Arcadia, {user.first_name}!
                                    </h1>
                                    <h3 className={classes.h3}>
                                        Arcadia is the all-in-one personalized, social experience bringing tarot into the 21st century.
                                    </h3>    
                                    <Typography className={classes.textarea} variant="body2" color="textSecondary">
                                        The concept behind this app - beyond adding my two cents about what these cards might mean for us today - is to create a new, modern way to learn the Tarot and harness its capacity to develop your intuitioon through practice and consistency (sounds a bit like coding!).
                                    </Typography>
                                    <Typography className={classes.textarea} variant="body2" color="textSecondary">
                                        If you're a divination afficionado, the options available to you via the menu in the top-right should feel familiar. If you're new to tarot, worry not! This application was built for newcomers and adepts alike. A great place to start would be drawing your daily card below. This simple, yet effective practice will help you familiarize yourself with the major and minor arcana, various suits, and every step within the expressions of the cycle of life which tarot represents. Click the card on the right to go to your daily drawing.
                                    </Typography>
                                    <Typography className={classes.textarea} variant="body2" color="textSecondary">
                                        At any time, you can click on a card image to learn more about that card's history and meaning, and how it may factor into your own interpretation of a reading. These details can be found at any time in the Tarot Library section of the app.
                                    </Typography>
                                    <Typography className={classes.textarea} variant="body2" color="textSecondary">
                                        Once you're feeling up to the challenge, try performing a multiple card reading to start developing your understanding of cards in sequence and their relationship to one another. At any time, you can clik the Switch Profiles button in the top-left and access your Public Profile where you can also perform and track readings for your friends.
                                    </Typography>
                                    <Typography className={classes.textarea} variant="body2" color="textSecondary">
                                        Happy reading!
                                    </Typography>
                                    {/* <Button onClick={() => history.push('/')} className={classes.back}>
                                        Go to my daily drawing
                                    </Button> */}
                                </Grid>
                            </Grid>
                            {/* <Grid item>
                                <Typography variant="subtitle1"> <img className={classes.thumbnail} src={card.suit_thumbnail} /></Typography>
                            </Grid> */}
                        </Grid>                        
                        <Grid item>
                            <ButtonBase component={Link} to={`/`} className={classes.image}>
                            <img className={classes.img} alt="complex" src={cardBack} />
                            </ButtonBase>
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1}>
                <Grid container spacing={2}>
                        
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    
                                    
                                    <h1 className={classes.h1} style={{color: "black"}}>
                                        About the Developer
                                    </h1>
                                    <h3 className={classes.h3}>
                                        Stuff about Alex
                                    </h3>    
                                    <Typography className={classes.textarea} variant="body2" color="textSecondary">
                                    Stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex.
                                    </Typography>
                                    <Typography className={classes.textarea} variant="body2" color="textSecondary">
                                    Stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex.
                                    </Typography>
                                    <Typography className={classes.textarea} variant="body2" color="textSecondary">
                                    Stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex stuff about Alex.
                                    </Typography>
                                    {/* <Button onClick={() => history.push('/')} className={classes.back}>
                                        Go to my daily drawing
                                    </Button> */}
                                </Grid>
                            </Grid>
                            {/* <Grid item>
                                <Typography variant="subtitle1"> <img className={classes.thumbnail} src={card.suit_thumbnail} /></Typography>
                            </Grid> */}
                        </Grid>                        
                        <Grid item>
                            <ButtonBase component={Link} to={`/`} className={classes.image}>
                            <img className={classes.img} alt="complex" src={cardBack} />
                            </ButtonBase>
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel>
            </Paper>
        </Fade>
        </ThemeProvider>
        </div>
        
        
        
        {/* <div className={classes.root}>
            <ThemeProvider theme={fontTheme}>
            <Fade in={checked}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    
                                    
                                    <h1 className={classes.h1} style={{color: "black"}}>
                                        Welcome to Arcadia, {user.first_name}!
                                    </h1>
                                    <h3 className={classes.h3}>
                                        Arcadia is the all-in-one personalized, social experience bringing tarot into the 21st century.
                                    </h3>    
                                    <Typography className={classes.textarea} variant="body2" color="textSecondary">
                                        The concept behind this app - beyond adding my two cents about what these cards might mean for us today - is to create a new, modern way to learn the Tarot and harness its capacity to develop your intuitioon through practice and consistency (sounds a bit like coding!).
                                    </Typography>
                                    <Typography className={classes.textarea} variant="body2" color="textSecondary">
                                        If you're a divination afficionado, the options available to you via the menu in the top-right should feel familiar. If you're new to tarot, worry not! This application was built for newcomers and adepts alike. A great place to start would be drawing your daily card below. This simple, yet effective practice will help you familiarize yourself with the major and minor arcana, various suits, and every step within the expressions of the cycle of life which tarot represents.
                                    </Typography>
                                    <Typography className={classes.textarea} variant="body2" color="textSecondary">
                                        At any time, you can click on a card image to learn more about that card's history and meaning, and how it may factor into your own interpretation of a reading. These details can be found at any time in the Tarot Library section of the app.
                                    </Typography>
                                    <Typography className={classes.textarea} variant="body2" color="textSecondary">
                                        Once you're feeling up to the challenge, try performing a multiple card reading to start developing your understanding of cards in sequence and their relationship to one another. At any time, you can clik the Switch Profiles button in the top-left and access your Public Profile where you can also perform and track readings for your friends.
                                    </Typography>
                                    <Typography className={classes.textarea} variant="body2" color="textSecondary">
                                        Happy reading!
                                    </Typography>
                                    <Button onClick={() => history.push('/')} className={classes.back}>
                                        Go to my daily drawing
                                    </Button>
                                </Grid>
                            </Grid>
                            {/* <Grid item>
                                <Typography variant="subtitle1"> <img className={classes.thumbnail} src={card.suit_thumbnail} /></Typography>
                            </Grid> */}
                        {/* </Grid>
                        <Grid item>
                            <ButtonBase component={Link} to={`/`} className={classes.image}>
                            <img className={classes.img} alt="complex" src={cardBack} />
                            </ButtonBase>
                        </Grid>         
                    </Grid>
                </Paper>
            </Fade>
            </ThemeProvider>
        </div>  */}
        </>
    )

}

export default About