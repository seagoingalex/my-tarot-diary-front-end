import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardList from "./CardList";
import { fetchCards } from "../store/reducers/reducerSlice.js";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function Cards() {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

//   const cards = useSelector((state) => state.global.entities);
    const cards = useSelector((state) => state.entities);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  return (
    // <Grid container className={classes.root} spacing={2}>
    //   <Grid item xs={12}>
    //     <Grid container justifyContent="center" spacing={spacing}>
    //       <CardList cards={cards} />
    //     </Grid>
    //   </Grid>
    // </Grid>


    <div className="App">
      <h1>Cards</h1>
      <div className="library-container">
        <CardList cards={cards} />
      </div>
    </div>
  );
}


//   return (
//     <div className="App">
//       <h1>Cards</h1>
//       <div className="library-container">
//         <CardList cards={cards} />
//       </div>
//     </div>
//   );
// }

export default Cards;
