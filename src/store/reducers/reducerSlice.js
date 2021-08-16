import { createSlice } from "@reduxjs/toolkit";

//slice
const slice = createSlice({
    name: 'global',
    initialState: {
        usernameInput: "",
        passwordInput: ""
    },
    reducers: {
        changeUsernameInput: (state, action) => {
            state.usernameInput = action.payload
        },
        changePasswordInput: (state, action) => {
            state.passwordInput = action.payload
        }
    }
})

//actions
const { changeUsernameInput, changePasswordInput } = slice.actions

//exports
export { changeUsernameInput, changePasswordInput }
export default slice.reducer

// V Original walkthrough from Joe below
// export const initialState = {
//     usernameInput: "",
//     passwordInput: ""
// }

// export const reducer = (state, action) => {
//     switch (action.type) {
//         case "CHANGE_USERNAME_INPUT":
//             return {
//                 ...state, usernameInput: action.payload
//             }
//             break;
//         case "CHANGE_PASSWORD_INPUT":
//             return {
//                 ...state, passwordInput: action.payload
//             }
//             break;    
//     }
//     return state

// }