import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  getDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

export default function TelescopeCard() {
  const user = auth.currentUser;
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

  const handleBuy = async (telescopeId) => {
    const telescopeRef = doc(db, "telescopes", telescopeId);
    const telescopeDoc = await getDoc(telescopeRef);

    if (telescopeDoc.exists()) {
      const telescopeData = telescopeDoc.data();

      if (!telescopeData.boughtBy.includes(user.email)) {
        const updatedBuyers = [...telescopeData.boughtBy, user.email];

        await updateDoc(telescopeRef, {
          boughtBy: updatedBuyers,
        });

        toast.success("Telescope successfully bought!");

        //refetch telescopes after successful purchase
        const updatedTelescopesSnapshot = await getDocs(
          collection(db, "telescopes")
        );
        const updatedTelescopesData = updatedTelescopesSnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );

        setTelescopes(updatedTelescopesData);
        setFilteredTelescopes(updatedTelescopesData);
      } else {
        toast.info("You already own this telescope.");
      }
    } else {
      toast.error("Telescope not found.");
    }
  };

  const renderBuyButton = (telescopeId) => {
    const telescope = telescopes.find((t) => t.id === telescopeId);

    if (user) {
      if (telescope.boughtBy && telescope.boughtBy.includes(user.email)) {
        return <p className="bought-text">You already own this telescope</p>;
      }
    }

    if (user && user.uid !== telescope.userId) {
      return (
        <button
          className="view-details-button"
          onClick={() => handleBuy(telescopeId)}
        >
          Buy
        </button>
      );
    }
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <div className="search-form">
        <input
          type="text"
          placeholder="Search by Build Type"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={handleKeyPress}
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
          <Link
            to={`/telescopes/${telescope.id}`}
            onClick={() => handleViewDetails(telescope.id)}
          >
            <button className="view-details-button">View Details</button>
          </Link>
          {renderBuyButton(telescope.id, telescope.userId)}
        </div>
      ))}
    </div>
  );
}
