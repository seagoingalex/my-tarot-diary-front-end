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

//For the 3 Card Grid
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';


const fontTheme = createTheme({
    typography: {
      fontFamily: [
        'Cairo',
      ].join(','),
    },
  });

const useStyles = makeStyles((theme) => ({
    undrawnroot: {
      flexGrow: 1,
    },
    undrawnpaper: {
      height: 140,
      width: 100,
    },
    undrawncontrol: {
      padding: theme.spacing(2),
    },
    container: {
      display: 'flex',
    //   margin: theme.spacing(1)
      marginTop: theme.spacing(-12),  
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
        marginBottom: theme.spacing(-7),      
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

    const [spacing, setSpacing] = React.useState(2);

    const [firstCardData, setFirstCardData] = React.useState(null)
    const [secondCardData, setSecondCardData] = React.useState(null)
    const [thirdCardData, setThirdCardData] = React.useState(null)
    const [firstCardImage, setFirstCardImage] = React.useState(cardBack)
    const [secondCardImage, setSecondCardImage] = React.useState(cardBack)
    const [thirdCardImage, setThirdCardImage] = React.useState(cardBack)

    const [saveButton, toggleSaveButton] = React.useState(true)


    // const handleChange = (event) => {
    //   setSpacing(Number(event.target.value));
    // };

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

    function handleMultiCustomDrawing(e) {
        e.preventDefault();
        setIsLoading(true);
        console.log("You did a custom multi drawing!")

        async function customReadingCreate() {
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
                    drawing_type: "Custom Drawing",
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
                cardDrawingCreate(reading, firstCardData)
                cardDrawingCreate(reading, secondCardData)
                cardDrawingCreate(reading, thirdCardData)
                history.push(`/chart/${reading.id}`)
            }
        }

        async function cardDrawingCreate(reading, cardData) {
            const res = await fetch("http://localhost:3000/card_drawings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    reading_id: reading.id,
                    card_id: cardData.id
                })
            })

            if(res.ok) {
                const drawing = await res.json()
                console.log ("New reading created!")
                // console.log(dailyReading)
                console.log(drawing)
                // history.push(`/readings/${reading.id}`)
            }
        }
        handleFadeChange();
        customReadingCreate()
        // history.push(`/chart/${dailyReading.id}`)
    }

    function handleFirstCardClick() {
      async function cardCreate() {
        fetch(`http://localhost:3000/cards/${Math.floor(Math.random() * (78 - 1 + 1)) + 1}`).then((r) => {
          if (r.ok) {
            // r.json().then((card) => setFirstCardData(card)
            r.json().then((card) => {
              setChecked(false)
              setFirstCardData(card)
              setFirstCardImage(card.img)
              setChecked(true)
            
            })
          }
        })
      }
      cardCreate()
    }

    function handleSecondCardClick() {
      async function cardCreate() {
        fetch(`http://localhost:3000/cards/${Math.floor(Math.random() * (78 - 1 + 1)) + 1}`).then((r) => {
          if (r.ok) {
            // r.json().then((card) => setFirstCardData(card)
            r.json().then((card) => {
              setChecked(false)
              setSecondCardData(card)
              setSecondCardImage(card.img)
              setChecked(true)
            
            })
          }
        })
      }
      cardCreate()
    }

        function handleThirdCardClick() {
      async function cardCreate() {
        fetch(`http://localhost:3000/cards/${Math.floor(Math.random() * (78 - 1 + 1)) + 1}`).then((r) => {
          if (r.ok) {
            // r.json().then((card) => setThirdCardData(card)
            r.json().then((card) => {
              setChecked(false)
              setThirdCardData(card)
              setThirdCardImage(card.img)
              setChecked(true)
            
            })
          }
        })
      }
      cardCreate()
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
                <form className={classes.form} onSubmit={handleMultiCustomDrawing}>
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
                    { firstCardData && secondCardData && thirdCardData ? 
                    <Button type="submit" value={isLoading ? "Loading..." : "Save"} className={classes.edit}>
                  Save
                </Button> : null }
                </form>
                </Grid>
                </Grid>
                </Grid>
                </Grid>
                </Paper>
                </Fade>
                </ThemeProvider>
          </div>
          <Fade in={checked}>
          <Grid container className={classes.root} spacing={1}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={3}>
          {/* {[0, 1, 2].map((value) => ( */}
            <Grid  item>
            <div className="container">
            {/* <h1> Draw your Daily Tarot. </h2> */}
            <img onClick={handleFirstCardClick} className={"undrawn-card"} src={firstCardImage} />
            <img onClick={handleSecondCardClick} className={"undrawn-card"} src={secondCardImage} />
            <img onClick={handleThirdCardClick} className={"undrawn-card"} src={thirdCardImage} />
        </div>
        </Grid>
        </Grid>
      </Grid>
      </Grid>
      </Fade>
       
        </>
    )

}

export default UndrawnSingleCustomReading