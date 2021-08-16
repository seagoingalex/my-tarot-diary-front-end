import { useState } from "react";

import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

// import { useDispatch, useSelector } from 'react-redux'

function Login() {
    const [showLogin, setShowLogin] = useState(true);

    // const dispatch = useDispatch();
    // const usernameInput = useSelector(state => state.usernameInput)
    // const passwordInput = useSelector(state => state.passwordInput)

    return (
        <>
        <h1>This is the Login component!</h1>

        {showLogin ? (
            <>
            <LoginForm></LoginForm>
            <p>
                Don't have an account? &nbsp;
                <button onClick={() => setShowLogin(false)}>
                  Sign Up
                </button>
            </p>
            </>
          ) : (
            <>
            <SignUpForm></SignUpForm>
            <p>
                Already have an account? &nbsp;
                <button onClick={() => setShowLogin(true)}>
                  Log In
                </button>
              </p>
            </>
          )}
        </>
    )

}

export default Login