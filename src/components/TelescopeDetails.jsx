import { React, useState, useEffect } from "react";
import { db } from "../firebase";
import Popup from "reactjs-popup";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  telescopeTypes,
  buildTypes,
  mountingTypes,
  gotoControls,
} from "./crud/Constants";

const TelescopeDetails = ({ telescopes }) => {
  const [editType, setEditType] = useState("");
  const [editBuildType, setEditBuildType] = useState("");
  const [editMountingType, setEditMountingType] = useState("");
  const [editGotoControls, setEditGotoControls] = useState("");
  const { id } = useParams();
  const telescope = telescopes.find((t) => t.id === id);
  const history = useNavigate();
  const [user, setUser] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [updatedTelescope, setUpdatedTelescope] = useState({
    type: telescope.type,
    buildType: telescope.buildType,
    mountingType: telescope.mountingType,
    gotoControl: telescope.gotoControl,
    image: telescope.image,
    aperture: telescope.aperture,
    condition: telescope.condition,
    exploitation: telescope.exploitation,
    price: telescope.price,
    description: telescope.description,
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
        if (!validateFields(updatedTelescope)) {
          toast.error("Please fill in all fields with valid values.");
          return;
        }

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

  const validateFields = (telescope) => {
    if (
      !telescope.type.trim() ||
      !telescope.buildType.trim() ||
      !telescope.mountingType.trim() ||
      !telescope.gotoControl.trim() ||
      !telescope.image.trim() ||
      !telescope.condition.trim() ||
      !telescope.exploitation.trim() ||
      !telescope.description.trim()
    ) {
      return false;
    }
    if (
      isNaN(Number(telescope.aperture)) ||
      isNaN(Number(telescope.price)) ||
      Number(telescope.aperture) <= 0 ||
      Number(telescope.price) <= 0
    ) {
      return false;
    }
    return (
      telescope.type.trim() !== "" &&
      telescope.buildType.trim() !== "" &&
      telescope.mountingType.trim() !== "" &&
      telescope.gotoControl.trim() !== "" &&
      telescope.image.trim() !== "" &&
      !isNaN(Number(telescope.aperture)) &&
      telescope.condition.trim() !== "" &&
      telescope.exploitation.trim() !== "" &&
      !isNaN(Number(telescope.price)) &&
      telescope.description.trim() !== ""
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "type":
        setEditType(value);
        setUpdatedTelescope((prevTelescope) => ({
          ...prevTelescope,
          type: value,
        }));
        break;
      case "buildType":
        setEditBuildType(value);
        setUpdatedTelescope((prevTelescope) => ({
          ...prevTelescope,
          buildType: value,
        }));
        break;
      case "mountingType":
        setEditMountingType(value);
        setUpdatedTelescope((prevTelescope) => ({
          ...prevTelescope,
          mountingType: value,
        }));
        break;
      case "gotoControls":
        setEditGotoControls(value);
        setUpdatedTelescope((prevTelescope) => ({
          ...prevTelescope,
          gotoControl: value,
        }));
        break;
      default:
        setUpdatedTelescope((prevTelescope) => ({
          ...prevTelescope,
          [name]: value,
        }));
    }
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
      <Popup open={showEditPopup} closeOnDocumentClick={false}>
        <div className="form-container">
          <h2>Edit Telescope</h2>
          <form>
            <select
              name="type"
              value={updatedTelescope.type}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select Type
              </option>
              {telescopeTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <select
              name="buildType"
              value={updatedTelescope.buildType}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select Build Type
              </option>
              {buildTypes.map((buildType) => (
                <option key={buildType} value={buildType}>
                  {buildType}
                </option>
              ))}
            </select>
            <select
              name="mountingType"
              value={updatedTelescope.mountingType}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select Mounting Type
              </option>
              {mountingTypes.map((mountingType) => (
                <option key={mountingType} value={mountingType}>
                  {mountingType}
                </option>
              ))}
            </select>
            <select
              name="gotoControl"
              value={updatedTelescope.gotoControl}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select GoTo Control
              </option>
              {gotoControls.map((gotoControl) => (
                <option key={gotoControl} value={gotoControl}>
                  {gotoControl}
                </option>
              ))}
            </select>
            <label>
              Image URL or file path:
              <input
                type="text"
                name="image"
                value={updatedTelescope.image}
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
              Condition:
              <input
                type="text"
                name="condition"
                value={updatedTelescope.condition}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Exploitation period:
              <textarea
                name="exploitation"
                value={updatedTelescope.exploitation}
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
            <label>
              Description:
              <textarea
                name="description"
                value={updatedTelescope.description}
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
      <Link to="/catalog" className="button-style">
        Close
      </Link>
    </div>
  );
};

export default TelescopeDetails;
