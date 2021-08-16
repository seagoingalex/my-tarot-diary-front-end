// import logo from './logo.svg';
import './App.css';
import { Provider, useDispatch, useSelector } from 'react-redux'
import store from '../store/store'
import { changeUsernameInput, changePasswordInput } from '../store/reducers/reducerSlice'
import { Switch, Route } from "react-router-dom";

import Login from "./Login";
import NavBar from "./NavBar";
import Home from "./Home";
import Profile from "./Profile";
import Chart from "./Chart";
import CardList from "./CardList";

function App() {
  const dispatch = useDispatch();
  const usernameInput = useSelector(state => state.usernameInput)
  const passwordInput = useSelector(state => state.passwordInput)

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
      <Route path="/library">
        <CardList></CardList>
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

export default () => (
  <Provider store={store}>
    <App>

    </App>
  </Provider>
)

// export default App;
