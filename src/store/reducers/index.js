export const initialState = {
    usernameInput: "",
    passwordInput: ""
}

export const reducer = (state, action) => {
    switch (action.type) {
        case "CHANGE_USERNAME_INPUT":
            return {
                ...state, usernameInput: action.payload
            }
            break;
        case "CHANGE_PASSWORD_INPUT":
            return {
                ...state, passwordInput: action.payload
            }
            break;    
    }
    return state

}