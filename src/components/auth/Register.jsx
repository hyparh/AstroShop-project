import React, { useState } from "react";
import Popup from "reactjs-popup";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onRegister = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Popup trigger={<button className="button"> Register </button>} modal>
      <div className="sign-in-container">
        <form onSubmit={onRegister}>
          <label>Create Account</label>
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
          <button type="submit">Register</button>
        </form>
      </div>
    </Popup>
  );
};

export default Register;
