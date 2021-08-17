import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardList from "./CardList";
import { fetchCards } from "../store/reducers/reducerSlice.js";

function Cats() {
//   const cards = useSelector((state) => state.global.entities);
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

export default Cats;
