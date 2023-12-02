import { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";

function CreateTelescope() {
  const [newBrand, setNewBrand] = useState("");
  const [newAperture, setNewAperture] = useState(0);

  const [telescopes, setTelescopes] = useState([]);
  const telescopesCollectionRef = collection(db, "telescopes");

  const createTelescopes = async () => {
    await addDoc(telescopesCollectionRef, {
      brand: newBrand,
      aperture: Number(newAperture),
    });
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
    <Popup trigger={<button className="button"> CREATE </button>} modal>
      <div className="create-form-container">
        <label className="auth-title" for="email">
          CREATE NEW
        </label>
        <br></br>
        <input
          placeholder="Brand..."
          onChange={(event) => {
            setNewBrand(event.target.value);
          }}
        ></input>
        <input
          placeholder="Aperture in mm..."
          onChange={(event) => {
            setNewAperture(event.target.value);
          }}
        ></input>
        <br></br>
        <button className="create-btn" onClick={createTelescopes}>
          Create Telescope
        </button>
        {telescopes.map((telescope) => {
          return (
            <div key={telescope.id}>
              <h1>Brand: {telescope.brand}</h1>
              <h1>Aperture: {telescope.aperture}</h1>
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
