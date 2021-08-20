import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Search from "./Search";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import { fetchCards } from "../store/reducers/reducerSlice.js";
import { useSelector, useDispatch } from "react-redux";

import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.css';

import Fade from '@material-ui/core/Fade';

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
}
}));

// function CardList({ cards = [] }) {
function CardList() {
  const [spacing, setSpacing] = React.useState(2);
  const [isLoading, setLoading] = React.useState(false)
  const [checked, setChecked] = React.useState(false);
  const [cardSearch, setCardSearch] = useState("")
  const [suitFilter, setSuitFilter] = useState("All");

  const classes = useStyles();

  const cards = useSelector((state) => state.entities);

  const cardItems = cards
      .filter((card) => {
        return suitFilter === "All" || card.suit === suitFilter;
      })
      .filter((card) => {
        return card.name.toLowerCase().includes(cardSearch.toLowerCase());
      })
      // .map((card) => {
      //   return <ProjectItem key={project.id} project={project} />;
      // });

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchCards());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCards())
      .then(setLoading(true))
      .then(setChecked(true))
  }, [dispatch]);

    function handleCardClick(e) {
        console.log("You clicked a card!")
        console.log(e.target)

    }

    // function handleSearchChange (e) {
    //   setSearch(e.target.value)
    // }

    if (!isLoading) return (
      <>
      <Spinner className={classes.spinner} animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
      </Spinner>
      </>
  );

    return (
      <>
      <Search setCardSearch={setCardSearch} setSuitFilter={setSuitFilter} cardSearch={cardSearch}/>
      
      <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={3}>
          {cardItems.map((card) => (
        // <Link to="/cardview/:id" > 
          <Fade in={checked}>
          <Grid key={card.id} item>
            <Link to={`/library/${card.id}`}>
              {/* <Paper className={classes.paper}></Paper> */}
                <img onClick={handleCardClick} className={classes.paper} key={card.id} src={card.img} alt="card" value={card.id}/>
            </Link>
          </Grid>
          </Fade>
          
          // {[0, 1, 2].map((value) => (
          //   <Grid key={value} item>
          //     <Paper className={classes.paper} />
          //   </Grid>
          // )
          ))}
        </Grid>
      </Grid>
    </Grid>
    </>
    );


  return (
    <div >
      {/* <h1>This is the Card List component.</h1> */}
      {cards.map((card) => (
        // <Link to="/cardview/:id" > 
        <Link to={`/library/${card.id}`}>
            <img onClick={handleCardClick} className="card" key={card.id} src={card.img} alt="card" value={card.id}/>
        </Link>
      ))}
    </div>
  );
}

export default CardList