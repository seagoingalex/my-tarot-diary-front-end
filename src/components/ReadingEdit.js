//React
import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom"

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
import TextField from '@material-ui/core/TextField';
import Fade from '@material-ui/core/Fade';
import { createTheme, ThemeProvider } from '@material-ui/core/styles'

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
    form: {
        '& > *': {
          margin: theme.spacing(1),
          width: '75ch',
        },
    }
  }));

function ReadingEdit() {
    const [reading, setReading] = useState({ rating: "", descriptors: "", notes: "" });
    const [card, setCard] = useState([])
    const [checked, setChecked] = useState(false);

    const { id } = useParams()
    const history = useHistory();
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3000/readings/${id}`)
            .then(r => r.json())
            .then(data => {
                setReading(data)
                setCard(data.cards[0])
                setChecked(true)
            }
        )
    }, [])

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
        <>
        <div className={classes.root}>
            <ThemeProvider theme={fontTheme}>
            <Fade in={checked}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1">
                                You asked: {reading.question}
                            </Typography>
                            <Typography gutterBottom variant="subtitle1">
                                You drew: {card.name} | {card.arcana_type} Arcana
                            </Typography>
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
    );
}

export default ReadingEdit