import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
// import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedInUser } from '../store/reducers/reducerSlice'

function NavBar() {
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.loggedInUser)
    
    const history = useHistory();

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

    return (
        <header>
          <div>
            <Link to="/" >Home</Link>
          </div>
          <div>  
              <>
              <Link to="/profile" >My Profile</Link>
              <Link to="/chart">My Chart</Link>
              {/* <Link to="/schedule">Schedule</Link> */}
              <Link to="/library">Tarot Library</Link>
              <button onClick={handleLogoutClick}>Logout</button>
              </>
          </div>
        </header>
      );
}

export default NavBar;