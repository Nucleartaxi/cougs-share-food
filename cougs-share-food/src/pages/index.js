import React from "react";
import "./homepage.css";

function handleCLick() {}

function Home() {
  return (
    <div>
      {/* <table width="100%" className="myTable">
        <tr>
          <th>search</th>
          <th>Cougs Share Food</th>
          <th>new</th>
        </tr>
      </table> */}
      <div className="page"> {/* <div className="topBar">
          <p className="search">Search</p>
          <p className="title">Cougs Share Food</p>
          <p className="new">new</p>
        </div>  */}

        <button onClick={handleCLick}> add</button>
      </div>

    </div>
  );
}

export default Home;
