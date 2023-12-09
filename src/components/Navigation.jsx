import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogIn from "./auth/LogIn";
import Register from "./auth/Register";
import CreateTelescope from "./crud/CreateTelescope";
import LogOut from "./auth/LogOut";

const Navigation = () => {
  const [user, setUser] = useState(null);

  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <nav className="nav">
      <div>
        <ul id="navbar">
          <li>
            <a className="active" href="index.html">
              Home
            </a>
          </li>
          <li>
            <a href="index.html">Shop</a>
          </li>
          <li>
            <a href="index.html">Blog</a>
          </li>
          <li>
            <a href="index.html">About</a>
          </li>
          <li>
            <a href="index.html">Contacts</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
