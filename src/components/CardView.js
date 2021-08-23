//React
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom"

//Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import { createTheme, ThemeProvider } from '@material-ui/core/styles'

//React Bootstrap imports
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.css';

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
        margin: theme.spacing(1, 0, 2),
        backgroundColor: "black",
        color: "white",
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

function CardView() {
    const [card, setCard] = useState(null);
    const [checked, setChecked] = React.useState(false);

    const { id } = useParams()
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        fetch(`http://localhost:3000/cards/${id}`)
            .then(r => r.json())
            .then(data => {
                setCard(data)
                setChecked(true)
            })
    }, [id])

    if (!card) return (
        <>
        <Spinner className={classes.spinner} animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
        </>
    );

    return (
        <div className={classes.root}>
            <ThemeProvider theme={fontTheme}>
            <Fade in={checked}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={card.img} />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        {card.name} | {card.arcana_type} Arcana
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
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1"> <img className={classes.thumbnail} src={card.suit_thumbnail} /></Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Fade>
            </ThemeProvider>
        </div>
    );
}

export default CardView