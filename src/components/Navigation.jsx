import "../App.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogIn from "./auth/LogIn";
import Register from "./auth/Register";
import CreateTelescope from "./crud/CreateTelescope";
import LogOut from "./auth/LogOut";

const Navigation = () => {
  const [user, setUser] = useState(null);
  const [userDisplayEmail, setUserDisplayEmail] = useState("");

  const updateUser = (userData) => {
    setUser(userData);
    setUserDisplayEmail(userData.email || "User");
  };

  return (
    <nav className="nav">
      <text className="heading">Astro Shop</text>
      <div>
        <ul id="navbar">
          <li>
            <a className="active" href="index.html">
              Home
            </a>
          </li>
          {user ? (
            <>
              <li>
                <a>
                  <CreateTelescope />
                </a>
              </li>
              <li>
                <a>
                  <LogOut onLogout={updateUser} />
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a className="sans">
                  <LogIn onLogin={updateUser} />
                </a>
              </li>
              <li>
                <a>
                  <Register onLogin={updateUser} />
                </a>
              </li>
            </>
          )}
          <li>
            <Link to="/catalog">Catalog</Link>
          </li>
          <li>
            <a href="index.html">Blog</a>
          </li>
          <li>
            <Link to="/about">About</Link>
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
