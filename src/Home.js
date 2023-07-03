import React from "react";
import { Link } from 'react-router-dom';


function  Home() {
    return (

<div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <Link to="/Local">
    <button
    className="btn-one">
        LOCAL</button>
  </Link>
  <Link to="/Global">
    <button
    className="btn-two">
        GLOBAL</button>
  </Link>
  <Link to="/server">
    <button
    className="btn-three">
        SERVER</button>
  </Link>
</div>
)
}
export default Home;