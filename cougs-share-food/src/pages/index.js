import React from "react";
import "./homepage.css";

function handleCLick() {}

function Home() {
  return (
    <div className="page">
      <div className="topBar">
        <p className="search">Search</p>
        <p className="title">Cougs Share Food</p>
        <p className="new">new</p>
      </div> 

      <button onClick={handleCLick}> add</button>
    </div>
  );
}

export default Home;
