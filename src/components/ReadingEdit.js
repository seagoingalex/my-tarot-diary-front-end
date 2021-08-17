import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom"

function ReadingEdit() {
    const [reading, setReading] = useState(null);
    const { id } = useParams()

    const history = useHistory();

    const [rating, setRating] = useState("")
    const [descriptors, setDescriptors] = useState("")
    const [notes, setNotes] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3000/readings/${id}`)
            .then(r => r.json())
            .then(data => 
                setReading(data) &&
                setRating(data.rating) &&
                setDescriptors(data.descriptors) &&
                setNotes(data.notes)
            )
            // .then(data => console.log(data))
    }, [id])

    function handleReadingUpdate(e) {
        e.preventDefault();
        setIsLoading(true);

        async function readingSave() {
            const res = await fetch(`http://localhost:3000/readings/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    rating: rating,
                    descriptors: descriptors,
                    notes: notes
                })
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

    if (!reading) return <h2>Loading...</h2>

    return (
        <>
        <h1>This is the Reading Edit component.</h1>
        <form onSubmit={handleReadingUpdate}>
            <input type="text" value={rating} onChange={(e) => setRating(e.target.value)}>
            </input>
            <input type="text" value={descriptors} onChange={(e) => setDescriptors(e.target.value)}>
            </input>
            <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)}>
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