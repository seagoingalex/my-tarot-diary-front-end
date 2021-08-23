//React
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

//Redux
import { fetchCards } from "../store/reducers/reducerSlice.js";
import { useSelector, useDispatch } from "react-redux";

//Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import { InputBase } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';

//React Boostrap imports
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.css';

//Image imports
import majorThumbnail from "../images/Thumbnails/MajorThumbnail.png"
import wandsThumbnail from "../images/Thumbnails/WandThumbnail.png"
import cupsThumbnail from "../images/Thumbnails/CupsThumbnail.png"
import swordsThumbnail from "../images/Thumbnails/SwordThumbnail.png"
import pentaclesThumbnail from "../images/Thumbnails/PentaclesThumbnail.png"

//Component-specific font theme and styling
const fontTheme = createTheme({
    typography: {
      fontFamily: [
        'Cairo',
      ].join(','),
    },
  });

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    color: "red",
  },
  paper: {
    height: 425.7,
    width: 258.9,
  },
  control: {
    padding: theme.spacing(2),
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
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  }, 
  filter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
    paddingBottom: `calc(1em + ${theme.spacing(0.3)}px)`,
  },
  filterimage: {
    height: 30,
    weight: 30,
  },
  filterbutton: {
    paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
    paddingRight: `calc(1em + ${theme.spacing(2)}px)`
  },
  search: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
    },
    paddingTop: `calc(1em + ${theme.spacing(2)}px)`,
  },
  
}));

function CardList() {
  const [cardSearch, setCardSearch] = useState("")
  const [suitFilter, setSuitFilter] = useState("All");
  const [isLoading, setLoading] = React.useState(false)
  const [checked, setChecked] = React.useState(false);


  const classes = useStyles();
  const cards = useSelector((state) => state.entities);

  const cardItems = cards
      .filter((card) => {
        return suitFilter === "All" || card.suit === suitFilter;
      })
      .filter((card) => {
        return card.name.toLowerCase().includes(cardSearch.toLowerCase());
      })

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCards())
      .then(setLoading(true))
      .then(setChecked(true))
  }, [dispatch]);

  if (!isLoading) return (
      <>
        <Spinner className={classes.spinner} animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
      </>
  );

  return (
      <>
      <ThemeProvider theme={fontTheme}>
      <Grid container className={classes.search} spacing={2}>
          <InputBase
              placeholder="Search…"
              classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setCardSearch(e.target.value)}
          />
          <Grid item xs={12}>   
              <div className={classes.filter}>
                <ButtonGroup variant="text" color="black" aria-label="text primary button group">
                  <Button className={classes.filterbutton} onClick={() => setSuitFilter("All")}>All</Button>
                  <Button className={classes.filterbutton} onClick={() => setSuitFilter("major")} ><img className={classes.filterimage} src={majorThumbnail}></img></Button>
                  <Button className={classes.filterbutton} onClick={() => setSuitFilter("wands")}><img className={classes.filterimage} src={wandsThumbnail}></img></Button>
                  <Button className={classes.filterbutton} onClick={() => setSuitFilter("cups")}><img className={classes.filterimage} src={cupsThumbnail}></img></Button>
                  <Button className={classes.filterbutton} onClick={() => setSuitFilter("swords")}><img className={classes.filterimage} src={swordsThumbnail}></img></Button>
                  <Button className={classes.filterbutton} onClick={() => setSuitFilter("pentacles")}><img className={classes.filterimage} src={pentaclesThumbnail}></img></Button>
                </ButtonGroup>
              </div> 
              <Grid container justifyContent="center" spacing={3}>
                  {cardItems.map((card) => (
                    <Fade in={checked}>
                      <Grid key={card.id} item>
                        <Link to={`/library/${card.id}`}>
                          {/* <Paper className={classes.paper}></Paper> */}
                            <img  className={classes.paper} key={card.id} src={card.img} alt="card" value={card.id}/>
                        </Link>
                      </Grid>
                    </Fade>
                  ))}
              </Grid>
          </Grid>
      </Grid>
      </ThemeProvider>
      </>
    );
}

export default CardList