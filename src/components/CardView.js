import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom"

function CardView() {
    const [card, setCard] = useState(null);
    const { id } = useParams()

    const history = useHistory();

    useEffect(() => {
        fetch(`http://localhost:3000/cards/${id}`)
            .then(r => r.json())
            .then(data => setCard(data))
            // .then(data => console.log(data))
    }, [id])

    if (!card) return <h2>Loading...</h2>

    return (
        <>
        <h1>{card.name}</h1>
        <button onClick={() => history.goBack()}>Back</button>
        <img src={card.img}></img>
        </>
    )

}

export default CardView