import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { useParams, useHistory } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default EditTelescope = () => {
  const { id } = useParams();
  const history = useHistory();

  const [telescope, setTelescope] = useState({
    type: "",
    aperture: 0,
    description: "",
    price: 0,
  });

  useEffect(() => {
    const fetchTelescope = async () => {
      const telescopeDoc = await getDoc(doc(db, "telescopes", id));
      if (telescopeDoc.exists()) {
        setTelescope(telescopeDoc.data());
      } else {
        console.error("Telescope not found");
      }
    };

    fetchTelescope();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTelescope((prevTelescope) => ({
      ...prevTelescope,
      [name]: value,
    }));
  };

  const handleEditTelescope = async () => {
    const telescopeRef = doc(db, "telescopes", id);

    try {
      await updateDoc(telescopeRef, telescope);
      console.log("Telescope updated successfully!");
      history.push(`/telescopes/${id}`);
    } catch (error) {
      console.error("Error updating telescope: ", error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Telescope</h2>
      <form>
        <label>
          Type:
          <input
            type="text"
            name="type"
            value={telescope.type}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Aperture:
          <input
            type="number"
            name="aperture"
            value={telescope.aperture}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={telescope.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={telescope.price}
            onChange={handleInputChange}
          />
        </label>
        <button className="button-style" type="button" onClick={handleEditTelescope}>
          Save Changes
        </button>
      </form>
    </div>
  );
};
