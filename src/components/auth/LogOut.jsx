import React from "react";
import Popup from "reactjs-popup";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";

const LogOut = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      if (onLogout) {
        onLogout();
      }
      toast.success("Logout successful!", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(`Logout failed: ${error.message}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <Popup trigger={<button className="button">LOGOUT</button>} modal>
      {(close) => (
        <div className="auth-form-container">
          <h3 className="darker-color">ARE YOU SURE YOU WANT TO LOGOUT?</h3>
          <button className="button-style" onClick={handleLogout}>
            Logout
          </button>
          <button className="button-style" onClick={close}>
            Cancel
          </button>
        </div>
      )}
    </Popup>
  );
};

export default LogOut;
