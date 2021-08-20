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
    }
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

    return (
        <div className={classes.root}>
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
                <Button onClick={() => history.goBack()} className={classes.back}>
                  Go Back
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
    </div>
    );

    return (
        <>
        <h1>This is the Reading View component.</h1>
        <h1>Question: {reading.question}</h1>
        {/* <h1>You drew: {cards.first.name}</h1> */}
        <h1>You drew: {card.name}</h1>
        <h2>Rating: {reading.rating}</h2>
        <h2>Descriptors: {reading.descriptors}</h2>
        <h3>Notes: {reading.notes}</h3>
        <Link to={`/chart/${reading.id}/edit`}>
            <button> Edit Entry </button>
        </Link>
        <button onClick={() => history.goBack()}>Back</button>
        <Link to={`/library/${card.id}`}>
            <img src={card.img}></img>
        </Link>
        </>
    )

}

export default ReadingView