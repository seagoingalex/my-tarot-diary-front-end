// import logo from './logo.svg';
import './App.css';
import { Provider, useDispatch, useSelector } from 'react-redux'
// import store from '../store/store'
import { changeUsernameInput, changePasswordInput, setLoggedInUser } from '../store/reducers/reducerSlice'
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./Login";
import NavBar from "./NavBar";
import Home from "./Home";
import Profile from "./Profile";
import Chart from "./Chart";
import CardList from "./CardList";
import Cards from "./Cards";
import CardView from "./CardView";

function App() {
  const dispatch = useDispatch();
  const usernameInput = useSelector(state => state.usernameInput)
  const passwordInput = useSelector(state => state.passwordInput)
  const loggedInUser = useSelector(state => state.loggedInUser)

  const handleUsernameChange = (e) => {
    console.log(e)
    dispatch(changeUsernameInput(e.target.value))
    // dispatch({ type: "CHANGE_USERNAME_INPUT", payload: e.target.value })
  }

  const handlePasswordChange = (e) => {
    console.log(e)
    dispatch(changePasswordInput(e.target.value))
    // dispatch({ type: "CHANGE_PASSWORD_INPUT", payload: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log (usernameInput, passwordInput)
  }

  useEffect(() => {
    fetch("http://localhost:3000/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setLoggedInUser(user))
        // r.json().then((user) => console.log(user))
      }
    })
  }, []);

  if (!loggedInUser) return <Login></Login>

  return (
    <>
    <NavBar></NavBar>
    <Switch>
      <Route exact path="/">
        <Home></Home>
      </Route>
      <Route path="/profile">
        <Profile></Profile>
      </Route>
      <Route path="/chart">
        <Chart></Chart>
      </Route>
      <Route exact path="/library">
        <Cards></Cards>
        {/* <CardList></CardList> */}
      </Route>
      <Route path="/library/:id">
        <CardView></CardView>
        {/* <CardList></CardList> */}
      </Route>
    </Switch>

    {/* <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleUsernameChange}>
      </input>
      <input type="text" onChange={handlePasswordChange}>
      </input>
      <input type="submit" value="Submit"></input>
    </form> */}
    </>
  );
}

export default App;
