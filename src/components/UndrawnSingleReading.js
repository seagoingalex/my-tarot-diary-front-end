import cardBack from '../images/card-back.jpeg'

function UndrawnSingleReading() {

    return (
        <>
        <h1>This is the Undrawn Single Reading component.</h1>
        <div className="container">
            <img className="undrawn-card" src={cardBack} />
        </div>
        </>
    )

}

export default UndrawnSingleReading