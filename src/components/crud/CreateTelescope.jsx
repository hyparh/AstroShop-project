import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import { db, auth } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";
import {
  telescopeTypes,
  buildTypes,
  mountingTypes,
  gotoControls,
} from "./Constants";

function CreateTelescope() {
  const [newType, setNewType] = useState("");
  const [newBuildType, setNewBuildType] = useState("");
  const [newMountingType, setNewMountingType] = useState("");
  const [newGotoControl, setNewGotoControl] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newAperture, setNewAperture] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [telescopes, setTelescopes] = useState([]);
  const telescopesCollectionRef = collection(db, "telescopes");

  const createTelescopes = async () => {
    const user = auth.currentUser;

    if (user) {
      try {
        const newTelescope = {
          type: newType,
          mountingType: newMountingType,
          buildType: newBuildType,
          gotoControl: newGotoControl,
          image: newImage,
          aperture: Number(newAperture),
          price: Number(newPrice),
          userId: user.uid,
        };

        if (
          !newType ||
          !newMountingType ||
          !newBuildType ||
          !newGotoControl ||
          (!newImage || !isNaN(Number(newImage))) ||
          isNaN(Number(newAperture)) ||
          isNaN(Number(newPrice))
        ) {
          toast.error("Please fill in all fields with valid values");
          return;
        }

        const docRef = await addDoc(telescopesCollectionRef, newTelescope);
        console.log(docRef);

        toast.success("Telescope successfully created!");
      } catch (error) {
        toast.error("Error creating telescope:", error.message);
      }
    } else {
      toast.error("User is not logged in");
    }
  };

  const updateTelescope = async (id, aperture) => {
    const telescopesDoc = doc(db, "telescopes", id);
    const newFields = { aperture: aperture + 1 };

    await updateDoc(telescopesDoc, newFields);
  };

  const deleteTelescope = async (id) => {
    const telescopesDoc = doc(db, "telescopes", id);

    await deleteDoc(telescopesDoc);
  };

  return (
    <Popup trigger={<button className="create-btn"> CREATE </button>} modal>
      <div className="create-form-container">
        <label className="auth-title" for="email">
          CREATE NEW
        </label>
        <br></br>
        <select
          value={newType}
          onChange={(event) => {
            setNewType(event.target.value);
          }}
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
          value={newBuildType}
          onChange={(event) => {
            setNewBuildType(event.target.value);
          }}
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
          value={newMountingType}
          onChange={(event) => {
            setNewMountingType(event.target.value);
          }}
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
          value={newGotoControl}
          onChange={(event) => {
            setNewGotoControl(event.target.value);
          }}
        >
          <option value="" disabled>
            Select Goto Control
          </option>
          {gotoControls.map((gotoControl) => (
            <option key={gotoControl} value={gotoControl}>
              {gotoControl}
            </option>
          ))}
        </select>
        <input
          placeholder="Image URL or file path"
          onChange={(event) => {
            setNewImage(event.target.value);
          }}
        ></input>
        <input
          placeholder="Aperture in mm..."
          onChange={(event) => {
            setNewAperture(event.target.value);
          }}
        ></input>
        <input
          placeholder="Price..."
          onChange={(event) => {
            setNewPrice(event.target.value);
          }}
        ></input>
        <br></br>
        <button className="create-btn" onClick={createTelescopes}>
          Create Telescope
        </button>
        {telescopes.map((telescope) => {
          return (
            <div key={telescope.id}>
              <img>{telescope.image}</img>
              <h1>Type: {telescope.type}</h1>
              <h1>Build type: {telescope.buildType}</h1>
              <h1>Aperture: {telescope.aperture}</h1>
              <h1>Mounting type: {telescope.mountingType}</h1>
              <h1>Goto control: {telescope.gotoControl}</h1>
              <h1>Price: {telescope.price}</h1>
              <button
                onClick={() => {
                  updateTelescope(telescope.id, telescope.aperture);
                }}
              >
                Increase Aperture
              </button>
              <button
                onClick={() => {
                  deleteTelescope(telescope.id);
                }}
              >
                Delete Telescope
              </button>
            </div>
          );
        })}
      </div>
    </Popup>
  );
}

export default CreateTelescope;
