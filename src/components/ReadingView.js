import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom"

//Grid container styles
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

import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.css';

import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';

//Material UI carousel attempt for multi card spread
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
// import itemData from './itemData';

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
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
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
    const [checked, setChecked] = React.useState(false);

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
            })
            // .then(data => setReading(data))
            // .then(data => console.log(data))
    }, [id])

    // if (!reading && !cards) return <h2>Loading...</h2>

    if (!reading && !cards) return (
        <>
        <Spinner className={classes.spinner} animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
        </>
    );

    if (reading.drawing_type === "Custom Drawing") return(
        <>
{cards[1] ? 
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
         : null }
        <div className={classes.root}>
            <ThemeProvider theme={fontTheme}>
          <CssBaseline />
            <Fade in={checked}>

       

      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          {/* <Grid item>
            <ButtonBase component={Link} to={`/library/${card.id}`} className={classes.image}>
              <img className={classes.img} alt="complex" src={card.img} />
            </ButtonBase>
          </Grid> */}
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
              <Typography gutterBottom variant="subtitle1">
                Question: {reading.question}
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                {cards[1] ? 
                  `Current Card Selection: ${card.name} | ${card.arcana_type} Arcana`
                  
                  : `You drew: ${card.name} | ${card.arcana_type} Arcana` }
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
                <Button onClick={() => history.push("/chart")} className={classes.back}>
                  Back to Chart
                </Button>
                <Button component={Link} to={`/chart/${reading.id}/edit`} className={classes.edit}>
                  Edit
                </Button>
              </Grid>
              <Grid item>
                {/* <Button className={classes.back}>
                  Go Back
                </Button> */}
                {/* <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  Go Back
                </Typography> */}
              </Grid>
            </Grid>
            {/* <Grid item>
              <Typography variant="subtitle1"> <img className={classes.thumbnail} src={card.suit_thumbnail} /></Typography>
            </Grid> */}
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
          {/* <Grid item>
            <ButtonBase component={Link} to={`/library/${card.id}`} className={classes.image}>
              <img className={classes.img} alt="complex" src={card.img} />
            </ButtonBase>
          </Grid> */}
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
                <Button onClick={() => history.push("/chart")} className={classes.back}>
                  Back to Chart
                </Button>
                <Button component={Link} to={`/chart/${reading.id}/edit`} className={classes.edit}>
                  Edit
                </Button>
              </Grid>
              <Grid item>
                {/* <Button className={classes.back}>
                  Go Back
                </Button> */}
                {/* <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  Go Back
                </Typography> */}
              </Grid>
            </Grid>
            {/* <Grid item>
              <Typography variant="subtitle1"> <img className={classes.thumbnail} src={card.suit_thumbnail} /></Typography>
            </Grid> */}
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