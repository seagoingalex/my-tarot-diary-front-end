import React from "react";

import { InputBase } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 'auto',
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

function Search({ setSuitFilter, setCardSearch, cardSearch }) {
    const classes = useStyles();

  return (
    <>
    <div className={classes.root}>
      <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={12}>
            <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => setCardSearch(e.target.value)}
            />
        </Grid>
        <Grid item xs={12}>
        <div className="phase-buttons">
        <button onClick={() => setSuitFilter("All")}>All</button>
        <button onClick={() => setSuitFilter("major")}>Major</button>
        <button onClick={() => setSuitFilter("wands")}>Wands</button>
        <button onClick={() => setSuitFilter("cups")}>Cups</button>
        <button onClick={() => setSuitFilter("swords")}>Swords</button>
        <button onClick={() => setSuitFilter("pentacles")}>Pentacles</button>
      </div>
        </Grid>    
    </Grid>    
    </div>

    {/* <div className="ui search">
      <div className="ui icon input">
        <input 
          onChange={(e) => setCardSearch(e.target.value)}
          value={cardSearch}
          className="prompt" />
        <i className="search icon" />
      </div>
    </div> */}



    </>
  );
}

export default Search;
