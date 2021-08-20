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
import TextField from '@material-ui/core/TextField';

import Fade from '@material-ui/core/Fade';

import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';

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
    form: {
        '& > *': {
          margin: theme.spacing(1),
          width: '75ch',
        },
    }
  }));

function ReadingEdit() {
    // const [reading, setReading] = useState(null);
    const [reading, setReading] = useState({ rating: "", descriptors: "", notes: "" });
    const [card, setCard] = useState([])

    const [checked, setChecked] = React.useState(false);

    const { id } = useParams()

    const history = useHistory();

    const classes = useStyles();

    // const [rating, setRating] = useState(reading.rating)
    // const [descriptors, setDescriptors] = useState(reading.descriptors)
    // const [notes, setNotes] = useState(reading.notes)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3000/readings/${id}`)
            .then(r => r.json())
            .then(data => {
                setReading(data)
                setCard(data.cards[0])
                setChecked(true)
                // setRating(data.rating)
                // setDescriptors(data.descriptors)
                // setNotes(data.notes)
            })
                
            // )
            // .then(data => console.log(data))
    }, [])


    // useEffect(() => {
    //     fetch(`http://localhost:3000/readings/${id}`)
    //         .then(r => r.json())
    //         .then(data => setReading({ rating: data.rating, descriptors: data.descriptors, notes: data.notes }))
    //             // setReading(data) &&
    //             // setRating(data.rating) &&
    //             // setDescriptors(data.descriptors) &&
    //             // setNotes(data.notes)
    //         // )
    //         // .then(data => console.log(data))
    // }, [])

    function handleReadingUpdate(e) {
        e.preventDefault();
        setIsLoading(true);

        async function readingSave() {
            const res = await fetch(`http://localhost:3000/readings/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reading)
            })

            if(res.ok) {
                const reading = await res.json()
                console.log("Reading updated successfully!")
                console.log(reading)
                // history.goBack()
                history.push(`/chart/${reading.id}`)
            }
        }

        readingSave();
    }

    function handleChange(e) {
        setReading({ ...reading, [e.target.name]: e.target.value})
    }

    if (!reading) return <h2>Loading...</h2>

    return (
        <div className={classes.root}>
            <ThemeProvider theme={fontTheme}>
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
                {/* <Typography variant="body2" gutterBottom>
                    Rating: {reading.rating}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Descriptors: {reading.descriptors}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Notes: {reading.notes}
                </Typography> */}
                
                <form className={classes.form} onSubmit={handleReadingUpdate}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Rating"
                        multiline
                        maxRows={4}
                        value={reading.rating}
                        onChange={handleChange}
                        variant="outlined"
                        placeholder="Give this reading a rating"
                        name="rating"
                    />
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Descriptors"
                        multiline
                        maxRows={4}
                        value={reading.descriptors}
                        onChange={handleChange}
                        variant="outlined"
                        placeholder="Describe your mood after this reading"
                        name="descriptors"
                    />
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Notes"
                        multiline
                        maxRows={7.5}
                        value={reading.notes}
                        onChange={handleChange}
                        variant="outlined"
                        placeholder="Enter your notes here..."
                        name="notes"
                        rows={7.5}
                        fullWidth
                    />

                <Button type="submit" value={isLoading ? "Loading..." : "Save"} className={classes.edit}>
                  Save
                </Button>
                <Button onClick={() => history.goBack()} className={classes.back}>
                  Cancel
                </Button>
                </form>

{/* 
                <Button onClick={() => history.goBack()} className={classes.back}>
                  Cancel
                </Button>
                <Button component={Link} to={`/chart/${reading.id}/edit`} className={classes.edit}>
                  Save
                </Button> */}
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

    return (
        <>
        <h1>This is the Reading Edit component.</h1>
        <form onSubmit={handleReadingUpdate}>
            <input type="text" placeholder="rating" name="rating" value={reading.rating} onChange={handleChange}>
            </input>
            <input type="text" placeholder="descriptors" name="descriptors" value={reading.descriptors} onChange={handleChange}>
            </input>
            <input type="text" placeholder="notes" name="notes" value={reading.notes} onChange={handleChange}>
            </input>
            <input type="submit" value={isLoading ? "Loading..." : "Save"}></input>
        </form>
        <Link to={`/chart/${reading.id}/edit`}>
            <button> Edit Entry </button>
        </Link>
        <button onClick={() => history.goBack()}>Back</button>
        
        </>
    )

}

export default ReadingEdit