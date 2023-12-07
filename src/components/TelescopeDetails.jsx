import React from "react";
import { Link, useParams } from "react-router-dom";

const TelescopeDetails = ({ telescopes }) => {
  const { id } = useParams();
  const telescope = telescopes.find((t) => t.id === id);

  return (
    <div className="telescope-details">
      <p>Type: {telescope.type}</p>
      <p>Aperture: {telescope.aperture} mm</p>
      <p>Description: {telescope.description}</p>
      <p>Price: ${telescope.price}</p>
      <Link to="/">Close</Link>
    </div>
  );
};

export default TelescopeDetails;
