import React, { useState } from "react";
import { useHistory } from "react-router-dom"

import { Provider, useDispatch, useSelector } from 'react-redux'
import { changeUsernameInput, changePasswordInput, setLoggedInUser } from '../store/reducers/reducerSlice'

function LoginForm() {
    const dispatch = useDispatch();
    const usernameInput = useSelector(state => state.usernameInput)
    const passwordInput = useSelector(state => state.passwordInput)
    const loggedInUser = useSelector(state => state.loggedInUser)

    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

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
        <h1>This is the Log In Form component.</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={handleUsernameChange}>
            </input>
            <input type="text" onChange={handlePasswordChange}>
            </input>
            <input type="submit" value={isLoading ? "Loading..." : "Sign Up"}></input>
        </form>
        </>
    )

}

export default LoginForm