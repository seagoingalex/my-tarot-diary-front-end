//React
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedInUser, togglePersonalProfile } from '../store/reducers/reducerSlice'

//Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { createTheme, ThemeProvider } from '@material-ui/core/styles'

//New Material UI for Controlled Open Select
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

//Image imports
import cardBack from '../images/card-back.jpeg'

//Component-specific font theme and styling
const fontTheme = createTheme({
    typography: {
      fontFamily: [
        'Cairo',
      ].join(','),
    },
  });

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
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
      },
      button: {
        display: 'block',
        marginTop: theme.spacing(2),
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      frienddrop: {
        marginTop: theme.spacing(-1),
        marginBottom: theme.spacing(1)
      }
  }));

function UndrawnSingleCustomReading() {
    const [question, setQuestion] = React.useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [checked, setChecked] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [friends, setFriends] = useState([])
    const [selectedFriend, setSelectedFriend] = React.useState('');
    
    const user = useSelector(state => state.loggedInUser)
    const dispatch = useDispatch();
    const personalProfileToggledOn = useSelector(state => state.personalProfileToggledOn)

    const classes = useStyles();
    const history = useHistory();

    const handleFadeChange = () => {
        setChecked((prev) => !prev);
    };

    function handleQuestionChange(e) {
        // setQuestion({ ...question, [e.target.name]: e.target.value})
        setQuestion(e.target.value)
    }

    const handleFriendChange = (event) => {
        setSelectedFriend(event.target.value);
      };
    
    const handleClose = () => {
        setOpen(false);
      };
    
    const handleOpen = () => {
        setOpen(true);
      };

    useEffect(() => {
        fetch(`http://localhost:3000/${user.id}/friends`)
            .then(r => r.json())
            .then(data => {
                setFriends(data)
                // setChartView(data.filter((reading) => reading.drawing_type === "Daily Drawing"))
                // console.log(data)
            }
        )
    }, [])      

    function handleSingleCustomDrawing(e) {
        e.preventDefault();
        setIsLoading(true);
        async function dailyReadingCreate() {
            if(personalProfileToggledOn) {
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
                    cardDrawingCreate(reading)
                }
            } else {
                const res = await fetch("http://localhost:3000/readings", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        read_requester_id: selectedFriend.id,
                        read_requester_type: "Friend",
                        reader_id: user.id,
                        reader_type: "PublicProfile",
                        drawing_type: "Custom Drawing",
                        question: question
                        // rating: "TBD"
                    })
                })

                if(res.ok) {
                    const reading = await res.json()
                    cardDrawingCreate(reading)
                }
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
                history.push(`/readings/${reading.id}`)
            }
        }

        handleFadeChange();
        dailyReadingCreate()
    }

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
                                    <form className={classes.form} onSubmit={handleSingleCustomDrawing}>
                                        {personalProfileToggledOn ? 
                                            <TextField
                                                id="outlined-multiline-flexible"
                                                label="Enter the question you'd like to ask for this reading"
                                                multiline
                                                maxRows={4}
                                                // value={question}
                                                onChange={handleQuestionChange}
                                                variant="outlined"
                                                placeholder="Enter your question"
                                                name="rating"
                                            />
                                        :
                                            <>
                                            <div className={classes.frienddrop}>
                                                <FormControl required className={classes.formControl}>
                                                    <InputLabel id="demo-controlled-open-select-label">Select a friend</InputLabel>
                                                    <Select
                                                        labelId="demo-controlled-open-select-label"
                                                        id="demo-controlled-open-select"
                                                        open={open}
                                                        onClose={handleClose}
                                                        onOpen={handleOpen}
                                                        value={selectedFriend}
                                                        onChange={handleFriendChange}
                                                    >                                   
                                                        {friends.map((friend) => (
                                                            <MenuItem value={friend}>{friend.first_name} {friend.last_name}</MenuItem>
                                                        ))}                                                
                                                            {/* <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            <MenuItem value={10}>Ten</MenuItem>
                                                            <MenuItem value={20}>Twenty</MenuItem>
                                                            <MenuItem value={30}>Thirty</MenuItem> */}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <TextField
                                                id="outlined-multiline-flexible"
                                                label="Enter the question your friend would like to ask for this reading"
                                                multiline
                                                maxRows={4}
                                                // value={question}
                                                onChange={handleQuestionChange}
                                                variant="outlined"
                                                placeholder="Enter your question"
                                                name="rating"
                                            />
                                            </>
                                        }
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
            <div className="container">
                {/* <h1> Draw your Daily Tarot. </h2> */}
                <img onClick={handleSingleCustomDrawing} className={"undrawn-card"} src={cardBack} />
            </div>
        </Fade>
        </>
    )
}

export default UndrawnSingleCustomReading