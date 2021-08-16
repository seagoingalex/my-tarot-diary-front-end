import { createStore } from "redux";
import globalReducer from './reducers/reducerSlice'
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
    reducer: globalReducer
})

export default store

// V Original walkthrough from Joe below
// export const store = createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())