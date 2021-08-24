//React
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedInUser, togglePersonalProfile } from '../store/reducers/reducerSlice'

//Form Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { createTheme, ThemeProvider } from '@material-ui/core/styles'

//New Material UI for Controlled Open Select
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

function UndrawnMultiCustomReading() {
    const [firstCardData, setFirstCardData] = useState(null)
    const [secondCardData, setSecondCardData] = useState(null)
    const [thirdCardData, setThirdCardData] = useState(null)
    const [firstCardImage, setFirstCardImage] = useState(cardBack)
    const [secondCardImage, setSecondCardImage] = useState(cardBack)
    const [thirdCardImage, setThirdCardImage] = useState(cardBack)
    const [question, setQuestion] = useState("")
    const [friendFirstName, setFriendFirstName] = useState("")
    const [friendLastName, setFriendLastName] = useState("")
    const [checked, setChecked] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [friends, setFriends] = useState([])
    const [selectedFriend, setSelectedFriend] = React.useState('');

    const classes = useStyles();
    const user = useSelector(state => state.loggedInUser)
    const history = useHistory();
    const personalProfileToggledOn = useSelector(state => state.personalProfileToggledOn)

    const handleFadeChange = () => {
        setChecked((prev) => !prev);
    };

    function handleQuestionChange(e) {
        // setQuestion({ ...question, [e.target.name]: e.target.value})
        setQuestion(e.target.value)
    }

    function handleFriendFirstNameChange(e) {
      // setQuestion({ ...question, [e.target.name]: e.target.value})
      setFriendFirstName(e.target.value)
  }

    function handleFriendLastNameChange(e) {
        // setQuestion({ ...question, [e.target.name]: e.target.value})
        setFriendLastName(e.target.value)
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

    function handleFriendSave(e) {
        e.preventDefault();

        async function friendSave() {
            const res = await fetch(`http://localhost:3000/friends`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    public_profile_id: user.id,
                    first_name: friendFirstName,
                    last_name: friendLastName,
                })
            })

            if(res.ok) {
                const newFriend = await res.json()
                setFriends([...friends, newFriend])
                // setSelectedFriend(`${newFriend.first_name + " " + newFriend.last_name}`)
                setSelectedFriend('')
                // history.push(`/single`)
            }
        }
        friendSave();
    }

    function handleMultiCustomDrawing(e) {
        e.preventDefault();
        setIsLoading(true);

        async function customReadingCreate() {
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
                    cardDrawingCreate(reading, firstCardData)
                    cardDrawingCreate(reading, secondCardData)
                    cardDrawingCreate(reading, thirdCardData)
                    // history.push(`/chart/${reading.id}`)
                    history.push(`/chart/`)
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

                  if(res.ok && personalProfileToggledOn) {
                      const reading = await res.json()
                      cardDrawingCreate(reading, firstCardData)
                      cardDrawingCreate(reading, secondCardData)
                      cardDrawingCreate(reading, thirdCardData)
                      // history.push(`/chart/${reading.id}`)
                      history.push(`/chart/`)
                  } else if(res.ok && !personalProfileToggledOn) {
                      const reading = await res.json()
                      cardDrawingCreate(reading, firstCardData)
                      cardDrawingCreate(reading, secondCardData)
                      cardDrawingCreate(reading, thirdCardData)
                      // history.push(`/chart/${reading.id}`)
                      history.push(`/friend-chart/`)
                  }
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
            }
        }
        handleFadeChange();
        customReadingCreate()
    }

    function handleFirstCardClick() {
      async function cardCreate() {
        fetch(`http://localhost:3000/cards/${Math.floor(Math.random() * (78 - 1 + 1)) + 1}`).then((r) => {
          if (r.ok) {
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
                        <form className={classes.form} onSubmit={handleMultiCustomDrawing}>
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
                                                <MenuItem value={"Add Friend +"}>
                                                    <em>Add Friend +</em>
                                                </MenuItem>
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
                            
                            { firstCardData && secondCardData && thirdCardData ? 
                              <Button type="submit" value={isLoading ? "Loading..." : "Save"} className={classes.edit}>
                                Save
                              </Button> 
                            : null }
                            
                            
                        </form>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Fade>
            {selectedFriend === "Add Friend +" ? 
                                    <Paper className={classes.paper}>
                                    <h1>Add a friend</h1>
                                    <form className={classes.form} onSubmit={handleFriendSave}>                
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label="Enter Your Friend's First Name"
                                            multiline
                                            maxRows={4}
                                            // value={question}
                                            onChange={handleFriendFirstNameChange}
                                            variant="outlined"
                                            placeholder="First Name"
                                            name="rating"
                                        />
                                        <TextField
                                            id="outlined-multiline-flexible"
                                            label="Enter Your Friend's Last Name"
                                            multiline
                                            maxRows={4}
                                            // value={question}
                                            onChange={handleFriendLastNameChange}
                                            variant="outlined"
                                            placeholder="Last Name"
                                            name="rating"
                                        />
                                        <Button type="submit" value={isLoading ? "Loading..." : "Save"} className={classes.edit}>
                                            Save
                                        </Button>
                                    </form>
                                    </Paper>
                                    : null}


            </ThemeProvider>
        </div>
        <Fade in={checked}>
          <Grid container className={classes.root} spacing={1}>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={3}>
                <Grid item>
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

export default UndrawnMultiCustomReading