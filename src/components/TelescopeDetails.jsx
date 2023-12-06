import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const TelescopeDetails = ({ telescopes }) => {
  const { id } = useParams();
  const telescope = telescopes.find((t) => t.id === id);

  return (
    <div>
      <p>Type: {telescope.type}</p>
      <p>Aperture: {telescope.aperture} mm</p>
      {/* Add other telescope properties as needed */}
      <p>Description: {telescope.description}</p>
      <p>Price: ${telescope.price}</p>
      {/* Add other details you want to display */}
    </div>
  );
};

export default TelescopeDetails;
