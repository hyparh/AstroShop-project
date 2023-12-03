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
        console.log(userData.email);
        setLoginSuccess(true);

        if (onLogin) {
          onLogin(userData);
        }

        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        toast.error(`Login failed: ${error.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <Popup
      trigger={<button className="button"> LOGIN </button>}
      modal
      // open={!loginSuccess} // Close the popup when login is successful
      // closeOnDocumentClick={!loginSuccess}
    >
      <div className="auth-form-container">
        <form onSubmit={onLogIn}>
          <label className="auth-title" for="email">
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
          <button className="login-btn" type="submit">
            Log In
          </button>
        </form>
      </div>
      {/* Display user's name if available */}
      {userDisplayEmail && <div className="user-display">Welcome, {userDisplayEmail}!</div>}
    </Popup>
  );
};

export default LogIn;
