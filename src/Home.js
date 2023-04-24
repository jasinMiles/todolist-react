import React from "react";
import { Link } from 'react-router-dom';


function  Home() {
    return (

<div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <Link to="/Local">
    <button
    className="btn-one">
        Button 1</button>
  </Link>
  <Link to="/Global">
    <button
    className="btn-two">
        Button 2</button>
  </Link>
  <Link to="/server">
    <button
    className="btn-three">
        Button 3</button>
  </Link>
</div>
)
}
export default Home;