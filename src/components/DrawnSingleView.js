//React
import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom"

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedInUser, togglePersonalProfile } from '../store/reducers/reducerSlice'

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
    }
  }));

function DrawnSingleView() {
    const [reading, setReading] = useState([])
    const [cards, setCards] = useState([])
    const [card, setCard] = useState([])
    const [checked, setChecked] = useState(false);
    const [friend, setFriend] = useState([])

    const personalProfileToggledOn = useSelector(state => state.personalProfileToggledOn)

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
                setFriend(data.read_requester)
                console.log(data.read_requester.first_name)
                console.log(data.read_requester.last_name)
            })
    }, [id])

    if (!reading && !cards) return <h2>Loading...</h2>

    return (
        <div className={classes.root}>
          <ThemeProvider theme={fontTheme}>
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
                          You drew: {card.name} | {card.arcana_type} Arcana
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            {card.meaning_up}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {card.desc_up}
                        </Typography>
                        <Button onClick={() => history.goBack()} className={classes.back}>
                          Go Back
                        </Button>
                        <Button component={Link} to={`/chart/${reading.id}/edit`} className={classes.edit}>
                          New Entry
                        </Button>
                      </Grid>

                    </Grid>
                  </Grid>
                <Fade in={checked}>
                  <Grid item>
                    <ButtonBase component={Link} to={`/library/${card.id}`} className={classes.image}>
                      <img className={classes.img} alt="complex" src={card.img} />
                    </ButtonBase>
                  </Grid>
                </Fade>
                </Grid>
              </Paper>
            </Fade>
          </ThemeProvider>
        </div>
    );
}

export default DrawnSingleView