import "../App.css";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import LogIn from "./auth/LogIn";
import Register from "./auth/Register";
import CreateTelescope from "./crud/CreateTelescope";
import LogOut from "./auth/LogOut";

const Navigation = () => {
  const [user, setUser] = useState(null);
  const [userDisplayEmail, setUserDisplayEmail] = useState("");

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    if (storedUserData) {
      setUser(storedUserData);
      setUserDisplayEmail(storedUserData.email || "User");
    }
  }, []);

  const updateUser = (userData) => {
    if (userData) {
      setUser(userData);
      setUserDisplayEmail(userData.email || "User");

      //store user data in localStorage
      localStorage.setItem("userData", JSON.stringify(userData));
    } else {
      setUser(null);
      setUserDisplayEmail("");

      //remove user data from localStorage on logout
      localStorage.removeItem("userData");
    }
  };

  return (
    <nav className="nav">
      <text className="heading">Astro Shop</text>
      <div>
        <ul id="navbar">
          <li>
            <Link to="/" className="active">
              Home
            </Link>
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
