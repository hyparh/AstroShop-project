import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { collection, getDocs } from "firebase/firestore";

export default function TelescopeCard() {
  const [telescopes, setTelescopes] = useState([]);
  const [selectedTelescope, setSelectedTelescope] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredTelescopes, setFilteredTelescopes] = useState([]);

  useEffect(() => {
    const fetchTelescopes = async () => {
      const telescopesCollectionRef = collection(db, "telescopes");
      const telescopesSnapshot = await getDocs(telescopesCollectionRef);
      const telescopesData = telescopesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTelescopes(telescopesData);
      setFilteredTelescopes(telescopesData);
    };

    fetchTelescopes();
  }, []);

  const handleViewDetails = (telescopeId) => {
    const selectedTelescope = telescopes.find(
      (telescope) => telescope.id === telescopeId
    );
    setSelectedTelescope(selectedTelescope);
  };

  const handleSearch = () => {
    const filtered = telescopes.filter((telescope) =>
      telescope.buildType.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredTelescopes(filtered);

    if (filtered.length === 0) {
      toast.info("No results found.");
      setFilteredTelescopes(telescopes);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search by Build Type"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {filteredTelescopes.map((telescope) => (
        <div key={telescope.id} className="telescope-card">
          <img
            className="card-image"
            src={telescope.image}
            alt="telescope image"
          />
          <h4 className="card-title">Type: {telescope.type}</h4>
          <h4 className="card-title">Build Type: {telescope.buildType}</h4>
          <p className="card-text">Aperture: {telescope.aperture} mm</p>
          <h3>${telescope.price}</h3>
          <h2>
            <Link
              to={`/telescopes/${telescope.id}`}
              onClick={() => handleViewDetails(telescope.id)}
            >
              <button className="view-details-button">View Details</button>
            </Link>
          </h2>
        </div>
      ))}
    </div>
  );
}
