//React
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { changeUsernameInput, changePasswordInput, setLoggedInUser } from '../store/reducers/reducerSlice'

// Child component imports
import NavBar from "./NavBar";
import Home from "./Home";
import Profile from "./Profile";
import Chart from "./Chart";
import CardList from "./CardList";
import Cards from "./Cards";
import CardView from "./CardView";
import ReadingView from "./ReadingView";
import ReadingEdit from "./ReadingEdit";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import DrawnSingleView from "./DrawnSingleView";
import UndrawnSingleCustomReading from "./UndrawnSingleCustomReading"
import UndrawnMultiCustomReading from "./UndrawnMultiCustomReading"

//Styling imports
import "@fontsource/cairo"
import 'bootstrap/dist/css/bootstrap.min.css';
// import logo from './logo.svg';
import './App.css';

//Material UI imports

function App() {
  // const dispatch = useDispatch();
  const usernameInput = useSelector(state => state.usernameInput)
  const passwordInput = useSelector(state => state.passwordInput)
  const loggedInUser = useSelector(state => state.loggedInUser)

  useEffect(() => {
    fetch("http://localhost:3000/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setLoggedInUser(user))
        // r.json().then((user) => console.log(user))
      }
    })
  }, []);

  if (!loggedInUser) return (
    
    <Switch>
      <Route exact path="/">
        <LoginForm></LoginForm>
      </Route>
      <Route exact path="/signup">
        <SignUpForm></SignUpForm>
      </Route>
    </Switch>
  )

  return (
    <>
    <NavBar></NavBar>
    <Switch>
      <Route exact path="/">
        <Home></Home>
      </Route>
      <Route exact path="/single">
        <UndrawnSingleCustomReading></UndrawnSingleCustomReading>
      </Route>
      <Route exact path="/multi">
        <UndrawnMultiCustomReading></UndrawnMultiCustomReading>
      </Route>
      <Route exact path="/readings/:id">
        <DrawnSingleView></DrawnSingleView>
      </Route>
      <Route path="/profile">
        <Profile></Profile>
      </Route>
      <Route exact path="/chart">
        <Chart></Chart>
      </Route>
      <Route exact path="/chart/:id">
        <ReadingView></ReadingView>
      </Route>
      <Route path="/chart/:id/edit">
        <ReadingEdit></ReadingEdit>
      </Route>
      <Route exact path="/library">
        {/* <Cards></Cards> */}
        <CardList></CardList>
      </Route>
      <Route path="/library/:id">
        <CardView></CardView>
      </Route>
    </Switch>
    </>
  );
}

export default App;
