//React
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

//Redux
import { useSelector } from 'react-redux'
import { setLoggedInUser } from '../store/reducers/reducerSlice'

// Child component imports
import NavBar from "./NavBar";
import Home from "./Home";
import About from "./About";
import Profile from "./Profile";
import Chart from "./Chart";
import PublicChart from "./PublicChart"
import CardList from "./CardList";
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
  const loggedInUser = useSelector(state => state.loggedInUser)

  useEffect(() => {
    fetch("http://localhost:3000/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setLoggedInUser(user))
        // r.json().then((user) => console.log(user))
      }
    })
  }, []);

  // The following conditional ensures visitors can only see the Login/Sign up pages prior to login
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
    <NavBar />
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/single">
        <UndrawnSingleCustomReading />
      </Route>
      <Route exact path="/multi">
        <UndrawnMultiCustomReading />
      </Route>
      <Route exact path="/readings/:id">
        <DrawnSingleView />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route exact path="/chart">
        <Chart />
      </Route>
      <Route exact path="/chart/:id">
        <ReadingView />
      </Route>
      <Route exact path="/friend-chart">
        <PublicChart />
      </Route>
      <Route path="/chart/:id/edit">
        <ReadingEdit />
      </Route>
      <Route exact path="/library">
        <CardList />
      </Route>
      <Route path="/library/:id">
        <CardView />
      </Route>
    </Switch>
    </>
  );
}

export default App;
