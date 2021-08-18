import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom"

function ReadingView() {
    const [reading, setReading] = useState([])
    const [cards, setCards] = useState([])
    const [card, setCard] = useState([])

    const { id } = useParams()

    const history = useHistory();

    useEffect(() => {
        fetch(`http://localhost:3000/readings/${id}`)
            .then(r => r.json())
            .then(data => {
                setReading(data)
                setCard(data.cards[0])
            })
            // .then(data => setReading(data))
            // .then(data => console.log(data))
    }, [id])

    if (!reading && !cards) return <h2>Loading...</h2>

    return (
        <>
        <h1>This is the Reading View component.</h1>
        <h1>Question: {reading.question}</h1>
        {/* <h1>You drew: {cards.first.name}</h1> */}
        <h1>You drew: {card.name}</h1>
        <h2>Rating: {reading.rating}</h2>
        <h2>Descriptors: {reading.descriptors}</h2>
        <h3>Notes: {reading.notes}</h3>
        <Link to={`/chart/${reading.id}/edit`}>
            <button> Edit Entry </button>
        </Link>
        <button onClick={() => history.goBack()}>Back</button>
        <Link to={`/library/${card.id}`}>
            <img src={card.img}></img>
        </Link>
        </>
    )

}

export default ReadingView