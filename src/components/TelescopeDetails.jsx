import { React, useState, useEffect } from "react";
import { db } from "../firebase";
import Popup from "reactjs-popup";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { Link, useNavigate, useParams } from "react-router-dom";

const TelescopeDetails = ({ telescopes }) => {
  const { id } = useParams();
  const telescope = telescopes.find((t) => t.id === id);
  const navigate = useNavigate();
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
        navigate("/");
      } else {
        toast.error("You don't have permission to delete this telescope.");
      }
    } catch (error) {
      toast.error("Error deleting telescope:", error.message);
    }
  };

  return (
    <div className="details-form-container">
      <img className="details-image" src={telescope.image} alt="Telescope" />
      <p className="darker-color" style={{ textAlign: "left" }}>
        Type: <span className="details-span">{telescope.type}</span>
      </p>
      <p className="darker-color" style={{ textAlign: "left" }}>
        Mounting type:{" "}
        <span className="details-span">{telescope.mountingType}</span>
      </p>
      <p className="darker-color" style={{ textAlign: "left" }}>
        Build type: <span className="details-span">{telescope.buildType}</span>
      </p>
      <p className="darker-color" style={{ textAlign: "left" }}>
        Goto control:{" "}
        <span className="details-span">{telescope.gotoControl}</span>
      </p>
      <p className="darker-color" style={{ textAlign: "left" }}>
        Aperture: <span className="details-span">{telescope.aperture} mm</span>
      </p>
      <p className="darker-color" style={{ textAlign: "left" }}>
        Condition: <span className="details-span">{telescope.condition}</span>
      </p>
      <p className="darker-color" style={{ textAlign: "left" }}>
        Exploitation:{" "}
        <span className="details-span">{telescope.exploitation}</span>
      </p>
      <p className="darker-color" style={{ textAlign: "left" }}>
        Description:{" "}
        <span className="details-span">{telescope.description}</span>
      </p>
      <p className="darker-color" style={{ textAlign: "left" }}>
        Price: $<span className="details-span">{telescope.price}</span>
      </p>
      {user && telescope && telescope.userId === user.uid && (
        <button
          onClick={() => setShowDeleteConfirmation(true)}
          className="button-style"
        >
          Delete
        </button>
      )}
      <Popup open={showDeleteConfirmation} closeOnDocumentClick={false}>
        <div className="form-container">
          <p className="form-heading">
            Are you sure you want to delete this telescope?
          </p>
          <button onClick={handleDelete} className="button-style">
            Yes
          </button>
          <button
            onClick={() => setShowDeleteConfirmation(false)}
            className="button-style"
          >
            No
          </button>
        </div>
      </Popup>
      <Link to={`/edit-telescope/${telescope.id}`} state={{ telescopes }} className="button-style">
        Edit Telescope
      </Link>
      <Link to="/catalog" className="button-style">
        Close
      </Link>
    </div>
  );
};

export default TelescopeDetails;
