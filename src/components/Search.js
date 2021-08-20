import React from "react";

function Search({ setSuitFilter, setCardSearch, cardSearch }) {
  return (
    <>
    <div className="ui search">
      <div className="ui icon input">
        <input 
          onChange={(e) => setCardSearch(e.target.value)}
          value={cardSearch}
          className="prompt" />
        <i className="search icon" />
      </div>
    </div>


    <div className="phase-buttons">
        <button onClick={() => setSuitFilter("All")}>All</button>
        <button onClick={() => setSuitFilter("major")}>Major</button>
        <button onClick={() => setSuitFilter("wands")}>Wands</button>
        <button onClick={() => setSuitFilter("cups")}>Cups</button>
        <button onClick={() => setSuitFilter("swords")}>Swords</button>
        <button onClick={() => setSuitFilter("pentacles")}>Pentacles</button>
      </div>
    </>
  );
}

export default Search;
