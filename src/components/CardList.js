import React, { useEffect } from "react";
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';

import { fetchCards } from "../store/reducers/reducerSlice.js";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 425.7,
    width: 258.9,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

// function CardList({ cards = [] }) {
function CardList() {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const cards = useSelector((state) => state.entities);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

    function handleCardClick(e) {
        console.log("You clicked a card!")
        console.log(e.target)

    }

    return (
      <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={3}>
          {cards.map((card) => (
        // <Link to="/cardview/:id" > 
          <Grid key={card.id} item>
            <Link to={`/library/${card.id}`}>
              {/* <Paper className={classes.paper}></Paper> */}
                <img onClick={handleCardClick} className={classes.paper} key={card.id} src={card.img} alt="card" value={card.id}/>
            </Link>
          </Grid>
          
          // {[0, 1, 2].map((value) => (
          //   <Grid key={value} item>
          //     <Paper className={classes.paper} />
          //   </Grid>
          // )
          ))}
        </Grid>
      </Grid>
    </Grid>
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