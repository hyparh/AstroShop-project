import { useState } from "react";
import { toast } from "react-toastify";
import { db, auth } from "../../firebase";
import { Link } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import {
  telescopeTypes,
  buildTypes,
  mountingTypes,
  gotoControls,
} from "../Constants";
import { useNavigate } from "react-router-dom";

export default function CreateTelescope() {
  const navigate = useNavigate();
  const user = auth.currentUser;

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

  const telescopesCollectionRef = collection(db, "telescopes");

  const createTelescopes = async (e) => {
    e.preventDefault();

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

        await addDoc(telescopesCollectionRef, newTelescope);
        toast.success("Telescope successfully created!");
        navigate("/catalog");
      } catch (error) {
        toast.error("Error creating telescope:", error.message);
      }
    } else {
      toast.error("User is not logged in");
    }
  };

  return (
    <div className="create-telescope-container">
      <div className="form-container">
        <form onSubmit={createTelescopes}>
          <label className="form-heading" htmlFor="email">
            Create new
          </label>
          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
          >
            <option value="" disabled>Select Type</option>
            {telescopeTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select
            value={newBuildType}
            onChange={(e) => setNewBuildType(e.target.value)}
          >
            <option value="" disabled>Select Build Type</option>
            {buildTypes.map((buildType) => (
              <option key={buildType} value={buildType}>{buildType}</option>
            ))}
          </select>

          <select
            value={newMountingType}
            onChange={(e) => setNewMountingType(e.target.value)}
          >
            <option value="" disabled>Select Mounting Type</option>
            {mountingTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select
            value={newGotoControl}
            onChange={(e) => setNewGotoControl(e.target.value)}
          >
            <option value="" disabled>Select Goto Control</option>
            {gotoControls.map((control) => (
              <option key={control} value={control}>{control}</option>
            ))}
          </select>

          <input
            placeholder="Image URL or file path"
            onChange={(e) => setNewImage(e.target.value)}
          />
          <input
            placeholder="Aperture in mm..."
            onChange={(e) => setNewAperture(e.target.value)}
          />
          <input
            placeholder="Condition..."
            onChange={(e) => setNewCondition(e.target.value)}
          />
          <input
            placeholder="Exploitation period..."
            onChange={(e) => setNewExploitation(e.target.value)}
          />
          <input
            placeholder="Price..."
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <textarea
            className="description"
            placeholder="Description..."
            onChange={(e) => setNewDescription(e.target.value)}
          />

          <button className="button-style" type="submit">
            Create Telescope
          </button>
        </form>
      </div>
    </div>
  );
}
