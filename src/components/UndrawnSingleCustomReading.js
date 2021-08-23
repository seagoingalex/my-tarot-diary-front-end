import React, { useState } from "react";
import cardBack from '../images/card-back.jpeg'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import FormControlLabel from '@material-ui/core/FormControlLabel';

//Form Material UI imports
import Typography from "@material-ui/core/Typography";
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

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
    // undrawn: {
    //   height: 120,
      
    // },
    container: {
      display: 'flex',
    //   margin: theme.spacing(1)
    },
    paper: {
    //   margin: theme.spacing(1),
    },
    svg: {
      width: 100,
      height: 100,
    },
    polygon: {
      fill: theme.palette.common.white,
      stroke: theme.palette.divider,
      strokeWidth: 1,
    },
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(2),  
        marginBottom: theme.spacing(-4),      
      },
      paper: {
        padding: theme.spacing(1),
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

function UndrawnSingleCustomReading() {
    const classes = useStyles();
    const [checked, setChecked] = React.useState(true);
    const [question, setQuestion] = React.useState("")

    const user = useSelector(state => state.loggedInUser)

    const [dailyReading, setDailyReading] = useState([])

    const [isLoading, setIsLoading] = useState(false);
    
    const history = useHistory();

    const handleFadeChange = () => {
        setChecked((prev) => !prev);
      };

      function handleChange(e) {
        // setQuestion({ ...question, [e.target.name]: e.target.value})
        setQuestion(e.target.value)
    }

    function handleSingleCustomDrawing(e) {
        e.preventDefault();
        setIsLoading(true);
        console.log("You did a daily drawing!")

        async function dailyReadingCreate() {
            const res = await fetch("http://localhost:3000/readings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    read_requester_id: user.id,
                    read_requester_type: "PersonalProfile",
                    reader_id: user.id,
                    reader_type: "PersonalProfile",
                    drawing_type: "Custom Single Drawing",
                    question: question
                    // rating: "TBD"
                })
            })

            if(res.ok) {
                const reading = await res.json()
                console.log(reading)
                // setDailyReading(reading)
                // console.log("Daily reading set!")
                // console.log(dailyReading)
                cardDrawingCreate(reading)
                // history.push(`/chart/${reading.id}`)
            }
        }

        async function cardDrawingCreate(reading) {
            const res = await fetch("http://localhost:3000/card_drawings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    reading_id: reading.id,
                    card_id: Math.floor(Math.random() * (78 - 1 + 1)) + 1
                })
            })

            if(res.ok) {
                const drawing = await res.json()
                console.log ("New reading created!")
                // console.log(dailyReading)
                console.log(drawing)
                history.push(`/readings/${reading.id}`)
            }
        }
        handleFadeChange();
        dailyReadingCreate()
        // history.push(`/chart/${dailyReading.id}`)
    }

    // if (!reading) return <h2>Loading...</h2>
    
    return (
        <>
        <div className={classes.root}>
            <ThemeProvider theme={fontTheme}>
            <Fade in={checked}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            {/* <ButtonBase component={Link} to={`/library/${card.id}`} className={classes.image}>
              <img className={classes.img} alt="complex" src={card.img} />
            </ButtonBase> */}
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
              {/* <Typography gutterBottom variant="subtitle1">
                Question: 
                </Typography> */}
                <form className={classes.form} onSubmit={handleSingleCustomDrawing}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Enter the question you'd like to ask for this reading"
                        multiline
                        maxRows={4}
                        // value={question}
                        onChange={handleChange}
                        variant="outlined"
                        placeholder="Enter your question"
                        name="rating"
                    />
                    {/* <Button type="submit" value={isLoading ? "Loading..." : "Save"} className={classes.edit}>
                  Save
                </Button> */}
                </form>
                </Grid>
                </Grid>
                </Grid>
                </Grid>
                </Paper>
                </Fade>
                </ThemeProvider>
          </div>

        {/* <h1 >Draw your Daily Tarot.</h1> */}
        <Fade in={checked}>
        <div className="container">
            {/* <h1> Draw your Daily Tarot. </h2> */}
            <img onClick={handleSingleCustomDrawing} className={"undrawn-card"} src={cardBack} />
        </div>
        </Fade>

       
        </>
    )

}

export default UndrawnSingleCustomReading