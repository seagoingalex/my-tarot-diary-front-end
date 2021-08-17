import React from "react";

function CardList({ cards = [] }) {
  return (
    <div >
      {/* <h1>This is the Card List component.</h1> */}
      {cards.map((card) => (
        <img className="card" key={card.id} src={card.img} alt="card" />
      ))}
    </div>
  );
}

export default CardList