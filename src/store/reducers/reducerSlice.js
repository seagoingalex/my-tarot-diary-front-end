import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 

// async actions

export const fetchCards = createAsyncThunk("global/fetchCards", () => {
    // return a Promise containing the data we want
    return fetch("http://localhost:3000/cards")
        .then((response) => response.json())
        .then((data) => data)
})

//slice
const slice = createSlice({
    name: 'global',
    initialState: {
        loggedInUser: null,
        usernameInput: "",
        passwordInput: "",
        entities: [],
        status: "idle"
    },
    reducers: {
        changeUsernameInput: (state, action) => {
            state.usernameInput = action.payload
        },
        changePasswordInput: (state, action) => {
            state.passwordInput = action.payload
        },
        setLoggedInUser: (state, action) => {
            state.loggedInUser = action.payload
        }
    },
    extraReducers: {
        [fetchCards.pending](state) {
            state.status = "loading";
        },
        [fetchCards.fulfilled](state, action) {
            state.entities = action.payload;
            state.status = "idle";
        },
    },
})

//actions
const { changeUsernameInput, changePasswordInput, setLoggedInUser } = slice.actions

//exports
export { changeUsernameInput, changePasswordInput, setLoggedInUser }
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