import { useDispatch, useSelector } from 'react-redux'

function Profile() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.loggedInUser)
    const username = useSelector(state => state.usernameInput)

    return (
        <>
        <h1 style={{color: "pink"}}>This is your profile page, {user.first_name}!</h1>
        <h2>Username: {username}</h2>
        <h2>Email: {user.email}</h2>
        <h2>Name: {user.first_name} {user.last_name}</h2>
        </>
    )

}

export default Profile