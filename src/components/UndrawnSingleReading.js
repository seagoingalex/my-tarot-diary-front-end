import React, { useState } from "react";
import cardBack from '../images/card-back.jpeg'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"

import ReactCardFlip from 'react-card-flip';

function UndrawnSingleReading() {
    const user = useSelector(state => state.loggedInUser)

    const [dailyReading, setDailyReading] = useState([])
    const [isFlipped, flipCard] = useState(false)

    function handleClick(e) {
        e.preventDefault();
        flipCard(!isFlipped);
      }

    const history = useHistory();

    function handleDailyDrawing(e) {
        console.log("You did a daily drawing!")

        async function dailyReadingCreate() {
            const res = await fetch("http://localhost:3000/readings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    read_requester_id: user.id,
                    read_requester_type: "PersonalProfile",
                    reader_id: user.id,
                    reader_type: "PersonalProfile",
                    drawing_type: "Daily Drawing",
                    question: "What is my daily reading?"
                })
            })

            if(res.ok) {
                const reading = await res.json()
                console.log(reading)
                // setDailyReading(reading)
                // console.log("Daily reading set!")
                // console.log(dailyReading)
                cardDrawingCreate(reading)
                // history.push(`/chart/${reading.id}`)
            }
        }

        async function cardDrawingCreate(reading) {
            const res = await fetch("http://localhost:3000/card_drawings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    reading_id: reading.id,
                    card_id: Math.floor(Math.random() * (78 - 1 + 1)) + 1
                })
            })

            if(res.ok) {
                const drawing = await res.json()
                console.log ("New reading created!")
                // console.log(dailyReading)
                console.log(drawing)
                history.push(`/readings/${reading.id}`)
            }
        }

        dailyReadingCreate()
        // history.push(`/chart/${dailyReading.id}`)
    }


    
    return (
        <>
        <h1 >Draw your Daily Tarot.</h1>
        <div className="container">
            {/* <h1> Draw your Daily Tarot. </h2> */}
            <img onClick={handleDailyDrawing} className="undrawn-card" src={cardBack} />
        </div>
        </>
    )

}

export default UndrawnSingleReading