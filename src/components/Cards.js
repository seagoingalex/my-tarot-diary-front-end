//React
import React, { useEffect } from "react";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { fetchCards } from "../store/reducers/reducerSlice.js";

//Child Component Imports
import CardList from "./CardList";

function Cards() {
    const cards = useSelector((state) => state.entities);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchCards());
    }, [dispatch]);

    return (
      <div className="App">
        <h1>Cards</h1>
        <div className="library-container">
          <CardList cards={cards} />
        </div>
      </div>
    );
}

export default Cards;
