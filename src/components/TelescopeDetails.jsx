import { React, useState, useEffect } from "react";
import { db } from "../firebase";
import Popup from "reactjs-popup";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { doc, deleteDoc } from "firebase/firestore";
import { Link, useNavigate, useParams } from "react-router-dom";

const TelescopeDetails = ({ telescopes }) => {
  const { id } = useParams();
  const telescope = telescopes.find((t) => t.id === id);
  const history = useNavigate();
  const [user, setUser] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async () => {
    try {
      const telescopeRef = doc(db, "telescopes", id);

      if (telescope && user && telescope.userId === user.uid) {
        await deleteDoc(telescopeRef);

        toast.success("Telescope successfully deleted!");
        history.push("/");
      } else {
        toast.error("You don't have permission to delete this telescope.");
      }
    } catch (error) {
      error("Error deleting telescope:", error.message);
    }
  };

  return (
    <div className="telescope-details">
      <p>Type: {telescope.type}</p>
      <p>Aperture: {telescope.aperture} mm</p>
      <p>Description: {telescope.description}</p>
      <p>Price: ${telescope.price}</p>
      {user && telescope && telescope.userId === user.uid && (
        <Link to="/edit-telescope:id" className="button-style">Edit</Link>
      )}    
      {user && telescope && telescope.userId === user.uid && (
        <button onClick={() => setShowDeleteConfirmation(true)}>Delete</button>
      )}
      <Popup open={showDeleteConfirmation} closeOnDocumentClick={false}>
        <div className="auth-form-container">
          <p className="darker-color">Are you sure you want to delete this telescope?</p>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={() => setShowDeleteConfirmation(false)}>No</button>
        </div>
      </Popup>
      <Link to="/" className="button-style">Close</Link>
    </div>
  );
};

export default TelescopeDetails;
