//React
import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom"

//Redux
import { useSelector } from 'react-redux'

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';

// Material UI carousel for multi card spread
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

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
        margin: theme.spacing(1, 0, 2,),
        backgroundColor: "black",
        color: "white",
    },
    edit: {
        margin: theme.spacing(1, 1, 2,),
        backgroundColor: "black",
        color: "white",
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
    imageroot: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
      },
      imageList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
      },
      title: {
        // color: theme.palette.secondary.light,
        color: "White",
        
      },
      titleBar: {
        background:
          'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
      },
  }));

function ReadingView() {
    const [reading, setReading] = useState([])
    const [cards, setCards] = useState([])
    const [card, setCard] = useState([])
    const [friend, setFriend] = useState([])
    const [checked, setChecked] = React.useState(false);

    const personalProfileToggledOn = useSelector(state => state.personalProfileToggledOn)
    const { id } = useParams()
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        fetch(`http://localhost:3000/readings/${id}`)
            .then(r => r.json())
            .then(data => {
                setCards(data.cards)
                setReading(data)
                setCard(data.cards[0])
                setChecked(true)
                setFriend(data.read_requester)
            })
    }, [id])

    if (!reading && !cards) return (
        <>
        <Spinner className={classes.spinner} animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
        </>
    );

    function handleDestroy() {        
        async function deleteReading() {
            const res = await fetch(`/readings/${reading.id}`, {
                method: 'DELETE'
            })
            
            if (res.ok && personalProfileToggledOn) {
                // console.log("Successfully deleted!")
                // setUpcomingAppointments(upcomingAppointments)
                history.push("/chart")
            } else if(res.ok && !personalProfileToggledOn) {
                history.push("/friend-chart")
            }
        }

        deleteReading();
    }

    if (reading.drawing_type === "Custom Drawing") return(
        <>
        {cards[1] ? 
            <Fade in={checked}>
                <div className={classes.imageroot}>
                    <ImageList className={classes.imageList} cols={3}>
                        {cards.map((card) => (
                            <ImageListItem key={card.img}>
                                <img onClick={() => setCard(card)} src={card.img} alt={card.name} />
                                <ImageListItemBar
                                    title={card.name}
                                    classes={{
                                        root: classes.titleBar,
                                        title: classes.title,
                                    }}
                                    actionIcon={
                                        <IconButton onClick={() => setCard(card)} aria-label={`star ${card.name}`}>
                                        <ArrowDownwardIcon className={classes.title} />
                                        </IconButton>
                                    }
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            </Fade>
        : null }        
        <div className={classes.root}>
            <ThemeProvider theme={fontTheme}>
            <CssBaseline />
            <Fade in={checked}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    {personalProfileToggledOn ? 
                                        <Typography gutterBottom variant="subtitle1">
                                        Question: {reading.question}
                                        </Typography> :
                                        <Typography gutterBottom variant="subtitle1">
                                        {friend.first_name} {friend.last_name}'s Question: {reading.question}
                                        </Typography>
                                    }
                                    <Typography gutterBottom variant="subtitle1">
                                        {cards[1] ? 
                                            `Current Card Selection: ${card.name} | ${card.arcana_type} Arcana`
                                        : `You drew: ${card.name} | ${card.arcana_type} Arcana` 
                                        }
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Rating: {reading.rating}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Descriptors: {reading.descriptors}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Notes: {reading.notes}
                                    </Typography>
                                    {personalProfileToggledOn ? 
                                        <Button onClick={() => history.push("/chart")} className={classes.back}>
                                            Back to Chart
                                         </Button> :
                                        <Button onClick={() => history.push("/friend-chart")} className={classes.back}>
                                            Back to Chart
                                        </Button>    
                                    }
                                    <Button component={Link} to={`/chart/${reading.id}/edit`} className={classes.edit}>
                                        Edit
                                    </Button>
                                    <Button onClick={handleDestroy} className={classes.back}>
                                        Delete
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <ButtonBase component={Link} to={`/library/${card.id}`} className={classes.image}>
                            <img className={classes.img} alt="complex" src={card.img} />
                            </ButtonBase>
                        </Grid>
                    </Grid>
                </Paper>
            </Fade>
            </ThemeProvider>
        </div>
        </>
    )

    return (
        <div className={classes.root}>
            <ThemeProvider theme={fontTheme}>
            <CssBaseline />
            <Fade in={checked}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        Question: {reading.question}
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle1">
                                        You drew: {card.name} | {card.arcana_type} Arcana
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Rating: {reading.rating}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Descriptors: {reading.descriptors}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Notes: {reading.notes}
                                    </Typography>
                                    {personalProfileToggledOn ? 
                                        <Button onClick={() => history.push("/chart")} className={classes.back}>
                                            Back to Chart
                                         </Button> :
                                        <Button onClick={() => history.push("/friend-chart")} className={classes.back}>
                                            Back to Chart
                                        </Button>    
                                    }
                                    
                                    
                                    
                                    <Button component={Link} to={`/chart/${reading.id}/edit`} className={classes.edit}>
                                        Edit
                                    </Button>
                                    <Button onClick={handleDestroy} className={classes.back}>
                                        Delete
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <ButtonBase component={Link} to={`/library/${card.id}`} className={classes.image}>
                            <img className={classes.img} alt="complex" src={card.img} />
                            </ButtonBase>
                        </Grid>
                    </Grid>
                </Paper>
            </Fade>
            </ThemeProvider>
        </div>
    );

}

export default ReadingView