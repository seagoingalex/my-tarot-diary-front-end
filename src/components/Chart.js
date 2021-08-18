import React, { useEffect, useState } from "react";
// import { useParams, useHistory } from "react-router-dom"
import { Link } from 'react-router-dom';

function Chart() {
    const [chart, setChart] = useState(null)

    useEffect(() => {
        fetch('http://localhost:3000/readings')
            .then(r => r.json())
            .then(data => setChart(data))
    }, [])

    if (!chart) return <h2>Loading...</h2>

    return (
        <>
        <h1>This is the Chart component.</h1>
        <ul>
            {chart.map((reading) => (
                <Link to={`/chart/${reading.id}`}>
                    <li key={reading.id}>This is a reading with the id {reading.id}</li>
                </Link>
            ))}
        </ul>
        </>
    )

}

export default Chart