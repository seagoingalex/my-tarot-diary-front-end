import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom"

function ReadingView() {
    const [reading, setReading] = useState(null);
    const { id } = useParams()

    const history = useHistory();

    useEffect(() => {
        fetch(`http://localhost:3000/readings/${id}`)
            .then(r => r.json())
            .then(data => setReading(data))
            // .then(data => console.log(data))
    }, [id])

    if (!reading) return <h2>Loading...</h2>

    return (
        <>
        <h1>This is the Reading View component.</h1>
        <h1>Question: {reading.question}</h1>
        <h2>Rating: {reading.rating}</h2>
        <h2>Descriptors: {reading.descriptors}</h2>
        <h3>Notes: {reading.notes}</h3>
        <Link to={`/chart/${reading.id}/edit`}>
            <button> Edit Entry </button>
        </Link>
        <button onClick={() => history.goBack()}>Back</button>
        
        </>
    )

}

export default ReadingView