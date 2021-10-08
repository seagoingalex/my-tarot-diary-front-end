import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 

// async fetch for rendering card data when the tarot library is accessed
export const fetchCards = createAsyncThunk("global/fetchCards", () => {
    return fetch("http://localhost:3000/cards")
        .then((response) => response.json())
        .then((data) => data)
})

// Slice created via Redux Toolkit. Used to manage 1) the current user logged in, 2) whether that user is accessing their personal or public profile, and 3) the loaded state for all card data.
const slice = createSlice({
    name: 'global',
    initialState: {
        loggedInUser: null,
        usernameInput: "",
        passwordInput: "",
        personalProfileToggledOn: true,
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
        },
        togglePersonalProfile: (state, action) => {
            state.personalProfileToggledOn = action.payload
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

// Destructured actions from above slice
const { changeUsernameInput, changePasswordInput, setLoggedInUser, togglePersonalProfile } = slice.actions

// Export actions to allow app components to change relevant states
export { changeUsernameInput, changePasswordInput, setLoggedInUser, togglePersonalProfile }
export default slice.reducer
