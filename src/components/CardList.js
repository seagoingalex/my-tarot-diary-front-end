import React from "react";
import { Link } from 'react-router-dom';

function CardList({ cards = [] }) {

    function handleCardClick(e) {
        console.log("You clicked a card!")
        console.log(e.target)

    }

  return (
    <div >
      {/* <h1>This is the Card List component.</h1> */}
      {cards.map((card) => (
        // <Link to="/cardview/:id" > 
        <Link to={`/library/${card.id}`}>
            <img onClick={handleCardClick} className="card" key={card.id} src={card.img} alt="card" value={card.id}/>
        </Link>
      ))}
    </div>
  );
}

export default CardList