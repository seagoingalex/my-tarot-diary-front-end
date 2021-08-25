
//React
import React, { useState } from "react";
import { useHistory } from "react-router-dom"

//Redux
import { useSelector } from 'react-redux'

//Material UI imports
import Fade from '@material-ui/core/Fade';

//Image imports
import cardBack from '../images/card-back.jpeg'

function UndrawnSingleReading() {
    const [checked, setChecked] = useState(true);
    const history = useHistory();
    const user = useSelector(state => state.loggedInUser)

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    function handleDailyDrawing(e) {
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
                    question: "What is my daily reading?",
                })
            })

            if(res.ok) {
                const reading = await res.json()
                console.log(reading)
                cardDrawingCreate(reading)
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
                history.push(`/readings/${reading.id}`)
            }
        }

        handleChange();
        dailyReadingCreate();
    }

    return (
        <>
        <Fade in={checked}>
        
            <div className="container">
                
                <img onClick={handleDailyDrawing} className={"undrawn-card"} src={cardBack} />
            </div>
        </Fade>
        </>
    )
}

export default UndrawnSingleReading