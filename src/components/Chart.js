import React, { useEffect, useState } from "react";
// import { useParams, useHistory } from "react-router-dom"
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux'

import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.css';

// Material-UI list imports
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

//Material UI for tabs
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';

const fontTheme = createTheme({
    typography: {
      fontFamily: [
        'Cairo',
      ].join(','),
    },
  });


const useStyles = makeStyles((theme) => ({
    tabroot: {
        flexGrow: 1,
        maxWidth: 500,
        margin: 'auto',
        marginBottom: theme.spacing(2),  
          
      },
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      margin: 'auto',
      
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
    thumbnail: {
        height: 25,
        weight: 25,
    },
    spinner: {
        position: 'absolute',
        left: 620,
        right: 0,
        top: 340,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }

  }));

  function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

function Chart() {
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    const [value, setValue] = React.useState(0);

    const user = useSelector(state => state.loggedInUser)

    const [chart, setChart] = useState(null)
    const [dailyDrawView, setDailyDrawView] = useState(true)
    const [chartView, setChartView] = useState(null)

    const handleTabChange = (event, newValue) => {
        console.log(event.target.value)
        const selectedReadingType = chart.filter((reading) => {
            if(!dailyDrawView) {
                return reading.drawing_type === "Daily Drawing"
            } else {
                return reading.drawing_type === "Custom Drawing"
            }
        })

        setDailyDrawView(!dailyDrawView);
        setValue(newValue)
        setChartView(selectedReadingType)
      };

    useEffect(() => {
        fetch(`http://localhost:3000/${user.id}/chart`)
            .then(r => r.json())
            .then(data => {
                setChart(data)
                setChartView(data.filter((reading) => reading.drawing_type === "Daily Drawing"))
            })

    }, [])

    if (!chartView) return (
        <>
        <Spinner className={classes.spinner} animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
        </>
    );

    // if (!chart) return <h2>Loading...</h2>

if(dailyDrawView) {
    return (
        <>
        <ThemeProvider theme={fontTheme}>

            

        <div className={classes.demo}>
        <Paper square className={classes.tabroot}>
        <Tabs
            value={value}
            onChange={handleTabChange}
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="secondary"
            aria-label="icon label tabs example"
        >
            <Tab icon={<Brightness3Icon />} label="DAILY DRAWS" />
            <Tab icon={<ViewWeekIcon />} label="CUSTOM READINGS" />
        </Tabs>
        </Paper>

            {chartView.map((reading) => (
                <List className={classes.root}>
                <ListItem>
                  <ListItemAvatar>
                  {/* <ListItemAvatar>
                  
                    {/* <Avatar src={reading.cards[0].suit_thumbnail}> */}
                      {/* <ImageIcon /> */}
                      <img className={classes.thumbnail} src={reading.cards[0].suit_thumbnail}></img>
                    {/* </Avatar>
                  </ListItemAvatar> */}
                  </ListItemAvatar>

                  <ListItemText primary={reading.cards[0].name} secondary={reading.created_at.substring(0,10)} />
                  <ListItemSecondaryAction>
                          Rating: {reading.rating}
                          <IconButton component={Link} to={`/chart/${reading.id}`} edge="end" aria-label="delete">
                            <DoubleArrowIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                        
                </ListItem>
                <Divider></Divider>
                </List>
            ))}
        </div>
        </ThemeProvider>

        </>
      );
    }

    else {
        return (
            <>
            <ThemeProvider theme={fontTheme}>
    
                
    
            <div className={classes.demo}>
            <Paper square className={classes.tabroot}>
            <Tabs
                value={value}
                onChange={handleTabChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="secondary"
                aria-label="icon label tabs example"
            >
                <Tab icon={<Brightness3Icon />} label="DAILY DRAWS" />
                <Tab icon={<ViewWeekIcon />} label="CUSTOM READINGS" />
            </Tabs>
            </Paper>
    
                {chartView.map((reading) => (
                    <List className={classes.root}>
                    <ListItem>
                      <ListItemAvatar>
                      {/* <ListItemAvatar>
                      
                        {/* <Avatar src={reading.cards[0].suit_thumbnail}> */}
                          {/* <ImageIcon /> */}
                          <img className={classes.thumbnail} src={reading.cards[0].suit_thumbnail}></img>
                        {/* </Avatar>
                      </ListItemAvatar> */}
                      </ListItemAvatar>
                      {reading.cards[1] ? <ListItemText primary={reading.created_at.substring(0,10) + " | Multi"} secondary={reading.question.substring(0,28) + "..."} />
                                : 
                      <ListItemText primary={reading.created_at.substring(0,10) + " | Single"} secondary={reading.question.substring(0,28) + "..."} />
                        }
                      <ListItemSecondaryAction>
                              Rating: {reading.rating}
                              <IconButton component={Link} to={`/chart/${reading.id}`} edge="end" aria-label="delete">
                              <DoubleArrowIcon />
                                
                              </IconButton>
                            </ListItemSecondaryAction>
                            
                    </ListItem>
                    <Divider></Divider>
                    </List>
                ))}
            </div>
            </ThemeProvider>
    
            </>
          );
    }

    return (
        <>
        <h1>This is the Chart component.</h1>
        <ul>
            {chart.map((reading) => (
                <Link to={`/chart/${reading.id}`}>
                    <li key={reading.id}>This is a reading with the id {reading.id}</li>
                </Link>
            ))}
        </ul>
        </>
    )

}

export default Chart