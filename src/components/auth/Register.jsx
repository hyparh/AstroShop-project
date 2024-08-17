import React, { useState } from "react";
import Popup from "reactjs-popup";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onRegister = (e, close) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      toast.error("Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        toast.success("Registration successful!");
        close();
      })
      .catch((error) => {
        toast.error(`Registration failed: ${error.message}`);
      });
  };

  return (
    <Popup trigger={<a style={{ cursor: "pointer" }}> Register </a>} modal>
      {(close) => (
        <div className="form-container">
          <form onSubmit={(e) => onRegister(e, close)}>
            <label className="form-heading">Create account</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <input
              type="password"
              placeholder="Repeat password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            ></input>
            <button className="button-style" type="submit">
              Register
            </button>
            <button className="button-style" onClick={close}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </Popup>
  );
};

export default Register;
