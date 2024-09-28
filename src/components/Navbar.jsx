import React from "react";
import {Link} from "react-router-dom";

function Navbar() {
  return (
    <React.Fragment>
      <div className="navbar flex justify-evenly h-20 bg-black text-white pt-4 text-4xl font-bold">
        <Link to="/">Home</Link>
        <Link to="/form">Form</Link>
      </div>
    </React.Fragment>
  );
}

export default Navbar;
