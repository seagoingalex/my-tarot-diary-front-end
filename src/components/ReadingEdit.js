import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom"

function ReadingEdit() {
    // const [reading, setReading] = useState(null);
    const [reading, setReading] = useState({ rating: "", descriptors: "", notes: "" });
    const { id } = useParams()

    const history = useHistory();

    // const [rating, setRating] = useState(reading.rating)
    // const [descriptors, setDescriptors] = useState(reading.descriptors)
    // const [notes, setNotes] = useState(reading.notes)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3000/readings/${id}`)
            .then(r => r.json())
            .then(data => {
                setReading(data)
                // setRating(data.rating)
                // setDescriptors(data.descriptors)
                // setNotes(data.notes)
            })
                
            // )
            // .then(data => console.log(data))
    }, [])


    // useEffect(() => {
    //     fetch(`http://localhost:3000/readings/${id}`)
    //         .then(r => r.json())
    //         .then(data => setReading({ rating: data.rating, descriptors: data.descriptors, notes: data.notes }))
    //             // setReading(data) &&
    //             // setRating(data.rating) &&
    //             // setDescriptors(data.descriptors) &&
    //             // setNotes(data.notes)
    //         // )
    //         // .then(data => console.log(data))
    // }, [])

    function handleReadingUpdate(e) {
        e.preventDefault();
        setIsLoading(true);

        async function readingSave() {
            const res = await fetch(`http://localhost:3000/readings/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reading)
            })

            if(res.ok) {
                const reading = await res.json()
                console.log("Reading updated successfully!")
                console.log(reading)
                history.goBack()
            }
        }

        readingSave();
    }

    function handleChange(e) {
        setReading({ ...reading, [e.target.name]: e.target.value})
    }

    if (!reading) return <h2>Loading...</h2>

    return (
        <>
        <h1>This is the Reading Edit component.</h1>
        <form onSubmit={handleReadingUpdate}>
            <input type="text" placeholder="rating" name="rating" value={reading.rating} onChange={handleChange}>
            </input>
            <input type="text" placeholder="descriptors" name="descriptors" value={reading.descriptors} onChange={handleChange}>
            </input>
            <input type="text" placeholder="notes" name="notes" value={reading.notes} onChange={handleChange}>
            </input>
            <input type="submit" value={isLoading ? "Loading..." : "Save"}></input>
        </form>
        <Link to={`/chart/${reading.id}/edit`}>
            <button> Edit Entry </button>
        </Link>
        <button onClick={() => history.goBack()}>Back</button>
        
        </>
    )

}

export default ReadingEdit