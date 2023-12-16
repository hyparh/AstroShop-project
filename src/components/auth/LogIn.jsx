import React, { useState } from "react";
import Popup from "reactjs-popup";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LogIn = ({ onLogin }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [userDisplayEmail, setUserDisplayEmail] = useState("");

  const onLogIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const userData = userCredentials.user;
        setUserDisplayEmail(userData.email || "User");
        setLoginSuccess(true);

        if (onLogin) {
          onLogin(userData);
        }

        toast.success("Login successful!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(`Login failed: ${error.message}`);
      });
  };

  return (
    <Popup trigger={<a style={{ cursor: "pointer" }}> Login </a>} modal>
      {(close) => (
        <div className="form-container">
          <form onSubmit={onLogIn}>
            <label className="form-heading" for="email">
              Enter your credentials
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button className="button-style" type="submit">
              Log In
            </button>
            <button className="button-style" onClick={close}>
              Cancel
            </button>
          </form>
        </div>
      )}
      {/* Display user's name if available */}
      {/* {userDisplayEmail && (
        <div className="user-display">Welcome, {userDisplayEmail}!</div>
      )} */}
    </Popup>
  );
};

export default LogIn;
