import { useState } from "react";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import { db, auth } from "../../firebase";
import { Link } from "react-router-dom";
import { collection, addDoc, getDocs } from "firebase/firestore";
import {
  telescopeTypes,
  buildTypes,
  mountingTypes,
  gotoControls,
} from "../Constants";
import { useNavigate } from "react-router-dom";

export default function CreateTelescope() {
  const navigate = useNavigate();

  const [newType, setNewType] = useState("");
  const [newBuildType, setNewBuildType] = useState("");
  const [newMountingType, setNewMountingType] = useState("");
  const [newGotoControl, setNewGotoControl] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newAperture, setNewAperture] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [newCondition, setNewCondition] = useState("");
  const [newExploitation, setNewExploitation] = useState("");
  //const [telescopes, setTelescopes] = useState([]);
  const telescopesCollectionRef = collection(db, "telescopes");

  const createTelescopes = async (close) => {
    const user = auth.currentUser;

    if (user) {
      try {
        const newTelescope = {
          type: newType,
          mountingType: newMountingType,
          buildType: newBuildType,
          gotoControl: newGotoControl,
          image: newImage,
          description: newDescription,
          aperture: Number(newAperture),
          price: Number(newPrice),
          condition: newCondition,
          exploitation: newExploitation,
          userId: user.uid,
          boughtBy: [],
        };

        if (
          !newType ||
          !newMountingType ||
          !newBuildType ||
          !newGotoControl ||
          !newImage ||
          !newCondition ||
          !newExploitation ||
          !isNaN(Number(newImage)) ||
          isNaN(Number(newAperture)) ||
          isNaN(Number(newPrice)) ||
          newAperture <= 0 ||
          newPrice <= 0
        ) {
          toast.error("Please fill in all fields with valid values");
          return;
        }

        const docRef = await addDoc(telescopesCollectionRef, newTelescope);
        console.log(docRef);

        toast.success("Telescope successfully created!");

        //refetch telescopes after successful purchase
        // const updatedTelescopesSnapshot = await getDocs(
        //   collection(db, "telescopes")
        // );
        // const updatedTelescopesData = updatedTelescopesSnapshot.docs.map(
        //   (doc) => ({
        //     id: doc.id,
        //     ...doc.data(),
        //   })
        // );

        // setTelescopes(updatedTelescopesData);
        // setFilteredTelescopes(updatedTelescopesData);

        navigate("/");
      } catch (error) {
        toast.error("Error creating telescope:", error.message);
      }
    } else {
      toast.error("User is not logged in");
    }
  };

  return (
    <Popup trigger={<a style={{ cursor: "pointer" }}> Create </a>} modal>
      {(close) => (
        <div className="form-container">
          <label className="form-heading" for="email">
            Create new
          </label>
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
            placeholder="Condition..."
            onChange={(event) => {
              setNewCondition(event.target.value);
            }}
          ></input>
          <input
            placeholder="Exploitation period..."
            onChange={(event) => {
              setNewExploitation(event.target.value);
            }}
          ></input>
          <input
            placeholder="Price..."
            onChange={(event) => {
              setNewPrice(event.target.value);
            }}
          ></input>
          <textarea
            className="description"
            placeholder="Description..."
            onChange={(event) => {
              setNewDescription(event.target.value);
            }}
          ></textarea>
          <Link
            to="/"
            className="button-style"
            onClick={createTelescopes}
            type="submit"
          >
            Create Telescope
          </Link>
          <button className="button-style" onClick={close}>
            Close
          </button>
        </div>
      )}
    </Popup>
  );
}
