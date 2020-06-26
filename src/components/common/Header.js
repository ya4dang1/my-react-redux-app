import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F1582A" };
  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle}>
        Home
      </NavLink>
      {" | "}
      <NavLink to="/books" activeStyle={activeStyle}>
        Books
      </NavLink>
      {" | "}
      <NavLink to="/about" activeStyle={activeStyle}>
        About
      </NavLink>
    </nav>
  );
};

export default Header;
