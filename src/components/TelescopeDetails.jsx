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
  const history = useNavigate();
  const [user, setUser] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [updatedTelescope, setUpdatedTelescope] = useState({
    type: "",
    aperture: 0,
    description: "",
    price: 0,
  });

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
        history("/");
      } else {
        toast.error("You don't have permission to delete this telescope.");
      }
    } catch (error) {
      toast.error("Error deleting telescope:", error.message);
    }
  };

  const handleEdit = async () => {
    try {
      const telescopeRef = doc(db, "telescopes", id);

      if (telescope && user && telescope.userId === user.uid) {
        await updateDoc(telescopeRef, updatedTelescope);

        toast.success("Telescope successfully updated!");
        setShowEditPopup(false);
      } else {
        toast.error("You don't have permission to edit this telescope.");
      }
    } catch (error) {
      toast.error("Error updating telescope:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTelescope((prevTelescope) => ({
      ...prevTelescope,
      [name]: value,
    }));
  };

  return (
    <div className="create-form-container" style={{ marginTop: "200px" }}>
      <img src={telescope.image} alt="Telescope" />
      <p className="darker-color" style={{ textAlign: "left" }}>
        Type: {telescope.type}
      </p>
      <p className="darker-color" style={{ textAlign: "left" }}>
        Mounting type: {telescope.mountingType}
      </p>
      <p className="darker-color" style={{ textAlign: "left" }}>
        Build type: {telescope.buildType}
      </p>
      <p className="darker-color" style={{ textAlign: "left" }}>
        Goto control: {telescope.gotoControl}
      </p>
      <p className="darker-color" style={{ textAlign: "left" }}>
        Aperture: {telescope.aperture} mm
      </p>
      <p className="darker-color" style={{ textAlign: "left" }}>
        Condition: {telescope.condition}
      </p>
      <p className="darker-color" style={{ textAlign: "left" }}>
        Exploitation: {telescope.exploitation}
      </p>
      <p className="darker-color" style={{ textAlign: "left" }}>
        Description: {telescope.description}
      </p>
      <p className="darker-color" style={{ textAlign: "left" }}>
        Price: ${telescope.price}
      </p>
      {user && telescope && telescope.userId === user.uid && (
        <button onClick={() => setShowEditPopup(true)} className="button-style">
          Edit
        </button>
      )}
      {user && telescope && telescope.userId === user.uid && (
        <button
          onClick={() => setShowDeleteConfirmation(true)}
          className="button-style"
        >
          Delete
        </button>
      )}
      <Popup open={showDeleteConfirmation} closeOnDocumentClick={false}>
        <div className="auth-form-container">
          <p className="darker-color">
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
      <Popup open={showEditPopup} closeOnDocumentClick={false}>
        {/* Your edit telescope form or component goes here */}
        {/* Pass handleEdit function to your edit form */}
        <div className="auth-form-container">
          <h2>Edit Telescope</h2>
          <form>
            <label>
              Type:
              <input
                type="text"
                name="type"
                value={updatedTelescope.type}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Aperture:
              <input
                type="number"
                name="aperture"
                value={updatedTelescope.aperture}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={updatedTelescope.description}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={updatedTelescope.price}
                onChange={handleInputChange}
              />
            </label>
          </form>
        </div>
        <button onClick={handleEdit} className="button-style">
          Save
        </button>
        <button
          onClick={() => setShowDeleteConfirmation(false)}
          className="button-style"
        >
          Cancel
        </button>
      </Popup>
      <Link to="/" className="button-style">
        Close
      </Link>
    </div>
  );
};

export default TelescopeDetails;
