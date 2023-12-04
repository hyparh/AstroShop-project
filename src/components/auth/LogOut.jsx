import React from "react";
import Popup from "reactjs-popup";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";

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
    <Popup trigger={<button className="button">Logout</button>} modal>
      <div className="auth-form-container">
        <h3>Are you sure you want to logout?</h3>
        <button className="logout-btn" onClick={handleLogout}>
          Yes, Logout
        </button>
        <button className="cancel-btn" onClick={() => close() }>
          Cancel
        </button>
      </div>
    </Popup>
  );
};

export default LogOut;
