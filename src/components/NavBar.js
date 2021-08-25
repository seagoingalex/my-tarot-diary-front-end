//React
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
// import styled from "styled-components";

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedInUser, togglePersonalProfile } from '../store/reducers/reducerSlice'

//NavBar Material UI components
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';

//Drawer material UI components
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InfoIcon from '@material-ui/icons/Info';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import TableChartIcon from '@material-ui/icons/TableChart';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import BallotIcon from '@material-ui/icons/Ballot';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Filter1Icon from '@material-ui/icons/Filter1';
import Filter3Icon from '@material-ui/icons/Filter3';
import PanToolIcon from '@material-ui/icons/PanTool';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import PersonIcon from '@material-ui/icons/Person';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

const fontTheme = createTheme({
  typography: {
    fontFamily: [
      'Cairo',
    ].join(','),
  },
});

const useStyles = makeStyles((theme) => ({
  // Appbar
  root: {
    flexGrow: 1,
    backgroundColor: "black",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  iconColor: {
    color: "#444444",
    disabled: true
  },
  // Drawer
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  }
}));

function NavBar() {
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.loggedInUser)
    const personalProfileToggledOn = useSelector(state => state.personalProfileToggledOn)
    
    const history = useHistory();

    const classes = useStyles();

    const user = useSelector(state => state.loggedInUser)

    //Drawer states
    const [state, setState] = useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Practice Tarot
            </ListSubheader>
          }
        >
          {personalProfileToggledOn ? 
                    <ListItem  button component={Link} to="/">
              <ListItemIcon className={classes.iconColor}><Brightness3Icon /></ListItemIcon>
              <ListItemText>Daily Reading</ListItemText>
            </ListItem>

            :
            <ListItem  disabled={true} button component={Link} to="/">
              <ListItemIcon className={classes.iconColor}><Brightness3Icon /></ListItemIcon>
              <ListItemText>Daily Reading</ListItemText>
            </ListItem>
          }
          <ListItem button component={Link} to="/single">
              <ListItemIcon className={classes.iconColor}><PanToolIcon /></ListItemIcon>
              <ListItemText>Single Card Drawing</ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/multi">
              <ListItemIcon className={classes.iconColor}><ViewWeekIcon /></ListItemIcon>
              <ListItemText>Multi Card Spread</ListItemText>
            </ListItem>
        </List>
        <Divider />
        
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Learn Tarot
            </ListSubheader>
          }
        >
          <ListItem button component={Link} to="/library">
            <ListItemIcon className={classes.iconColor}><MenuBookIcon /></ListItemIcon>
            <ListItemText>Tarot Library</ListItemText>
          </ListItem>
          <ListItem button component={Link} to="/about">
            <ListItemIcon className={classes.iconColor}><InfoIcon /></ListItemIcon>
            <ListItemText>About</ListItemText>
          </ListItem>
        </List>
        <Divider />
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              My Tarot
            </ListSubheader>
          }
        >
          {personalProfileToggledOn ? 
            <ListItem button component={Link} to="/chart">
              <ListItemIcon className={classes.iconColor}><BallotIcon /></ListItemIcon>
              <ListItemText>My Personal Chart</ListItemText>
            </ListItem>
          :
          <ListItem button component={Link} to="/friend-chart">
          <ListItemIcon className={classes.iconColor}><BallotIcon /></ListItemIcon>
          <ListItemText>My Friend Chart</ListItemText>
        </ListItem>
          }
            <ListItem button component={Link} to="/profile">
              <ListItemIcon className={classes.iconColor}><PersonIcon /></ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button component={Link} onClick={handleLogoutClick}>
            <ListItemIcon className={classes.iconColor}><ExitToAppIcon /></ListItemIcon>
            <ListItemText>Log out</ListItemText>
          </ListItem>
        </List>
        
        
        
        
      </div>
    );

    // const NavUnlisted = styled.ul`
    //     text-decoration: none;
    // `;

    // const linkStyle = {
    //     margin: "1rem",
    //     textDecoration: "none",
    //     color: 'blue'
    //   };
    
    function handleLogoutClick() {
        fetch("http://localhost:3000/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
                // setUser(null)
                dispatch(setLoggedInUser(null))
                console.log("Successfully logged out!")
                history.push("/")
            }
        });
    }

    function handleSwitchProfileClick() {
        dispatch(togglePersonalProfile(!personalProfileToggledOn))
        history.push('/profile')
    }

    return (
      <>
        {/* Actual Appbar */}
        <div className={classes.root}>
        <ThemeProvider theme={fontTheme}>
          <CssBaseline />
          <AppBar style={{ background: 'black' }} position="static">
            <Toolbar >
              <IconButton onClick={toggleDrawer('left', true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                {list('left')}
              </Drawer>
              <Typography variant="h6" className={classes.title}>
                Welcome to My Daily Tarot, {user.first_name}! This is your {personalProfileToggledOn ? "Personal" : "Public"} Profile.
              </Typography>
              <Button onClick={() => handleSwitchProfileClick()} color="inherit">Switch Profiles</Button>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
        </div>
        
      </>
      );
}

export default NavBar;