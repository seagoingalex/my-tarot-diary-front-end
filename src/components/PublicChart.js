//React
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

//Redux
import { useSelector } from 'react-redux'

//Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade';

//React Bootstrap imports
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.css';

//Component-specific font theme and styling
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
        height: 1250,
        
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

function PublicChart() {
    const [chart, setChart] = useState(null)
    const [dailyDrawView, setDailyDrawView] = useState(true)
    const [chartView, setChartView] = useState(null)
    const [checked, setChecked] = React.useState(false);
    const [value, setValue] = React.useState(0);

    const user = useSelector(state => state.loggedInUser)
    const personalProfileToggledOn = useSelector(state => state.personalProfileToggledOn)
    

    const classes = useStyles();

    const handleTabChange = (e, newValue) => {
        console.log(e.target.value)
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
        fetch(`http://localhost:3000/${user.id}/public-chart`)
            .then(r => r.json())
            .then(data => {
                // setChart(data)
                // setChartView(data.filter((reading) => reading.drawing_type === "Custom Drawing"))
                setChartView(data.filter((reading) => reading.read_requester_type === "Friend"))
                // setChartView(data)
                setChecked(true)
                console.log(data)
            }
        )
    }, [])

    if (!chartView) return (
        <>
        <Spinner className={classes.spinner} animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
        </>
    );

    // if (!chart) return <h2>Loading...</h2>

    // if(dailyDrawView) {
    //     return (
    //         <>
    //         <ThemeProvider theme={fontTheme}>   
    //             <Fade in={checked}>
    //                 <div className={classes.demo}>
    //                     <Paper square className={classes.tabroot}>
    //                         <Tabs
    //                             value={value}
    //                             onChange={handleTabChange}
    //                             variant="fullWidth"
    //                             indicatorColor="secondary"
    //                             textColor="secondary"
    //                             aria-label="icon label tabs example"
    //                         >
    //                             <Tab disabled={true} icon={<Brightness3Icon />} label="DAILY DRAWS" />
    //                             <Tab icon={<ViewWeekIcon />} label="FRIEND READINGS" />
    //                         </Tabs>
    //                     </Paper>
    //                     {chartView.map((reading) => (
    //                         <List className={classes.root}>
    //                             <ListItem>
    //                                 <ListItemAvatar>
    //                                     <img className={classes.thumbnail} src={reading.cards[0].suit_thumbnail}></img>
    //                                 </ListItemAvatar>
    //                                 <ListItemText primary={reading.cards[0].name} secondary={reading.created_at.substring(0,10)} />
    //                                 <ListItemSecondaryAction>
    //                                     Rating: {reading.rating}
    //                                     <IconButton component={Link} to={`/chart/${reading.id}`} edge="end" aria-label="delete">
    //                                         <DoubleArrowIcon />
    //                                     </IconButton>
    //                                 </ListItemSecondaryAction>        
    //                             </ListItem>
    //                             <Divider></Divider>
    //                         </List>
    //                     ))}
    //                 </div>
    //             </Fade>
    //         </ThemeProvider>
    //         </>
    //     );
    // }

    // else {
        return (
            <>
            <ThemeProvider theme={fontTheme}>
                <Fade in={checked}>
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
                                <Tab icon={<ViewWeekIcon />} label="FRIEND READINGS" />
                            </Tabs>
                        </Paper>
                        {chartView.map((reading) => (
                            <List className={classes.root}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <img className={classes.thumbnail} src={reading.cards[0].suit_thumbnail}></img>
                                    </ListItemAvatar>
                                    {reading.cards[1] ? 
                                        <ListItemText primary={reading.created_at.substring(0,10) + " | Multi"} secondary={reading.read_requester.first_name + " " + reading.read_requester.last_name + " | " +  reading.question.substring(0,14) + "..."} />
                                    : 
                                        <ListItemText primary={reading.created_at.substring(0,10) + " | Single"} secondary={reading.read_requester.first_name + " " + reading.read_requester.last_name + " | " +  reading.question.substring(0,14) + "..."}/>
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
                </Fade>
            </ThemeProvider>
            </>
        );
    // }
}

export default PublicChart