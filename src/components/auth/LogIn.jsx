import React, { useState } from "react";
import Popup from "reactjs-popup";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";

const LogIn = ({ onLogin }) => {
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
      })
      .catch((error) => {
        toast.error(`Login failed: ${error.message}`);
      });
  };

  return (
    <Popup trigger={<button> LOGIN </button>} modal>
      <div className="auth-form-container">
        <form onSubmit={onLogIn}>
          <label className="darker-color" for="email">
            ENTER YOUR CREDENTIALS
          </label>
          <br></br>
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
          <br></br>
          <button className="button-style" type="submit">
            Log In
          </button>
        </form>
      </div>
      {/* Display user's name if available */}
      {userDisplayEmail && (
        <div className="user-display">Welcome, {userDisplayEmail}!</div>
      )}
    </Popup>
  );
};

export default LogIn;
