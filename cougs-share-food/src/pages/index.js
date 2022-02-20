import React from "react";
import "./homepage.css";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


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

        <Button component={Link} to="/inputForm" variant="contained" color="primary">
          New
        </Button>
      </div>

    </div>
  );
}

export default Home;
