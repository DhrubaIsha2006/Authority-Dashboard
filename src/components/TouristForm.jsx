// TouristForm.jsx

import React, { useState } from "react";

const TouristForm = ({ onAddTourist }) => {
  const [lng, setLng] = useState("");
  const [lat, setLat] = useState("");
  const [status, setStatus] = useState("Safe");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (lng.trim() === "" || lat.trim() === "") {
      alert("Please enter both longitude and latitude");
      return;
    }
    onAddTourist({ lng, lat, status });
    setLng("");
    setLat("");
    setStatus("Safe");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
      <label>
        Longitude:
        <input
          type="number"
          step="any"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          placeholder="e.g. 88.4030"
          required
        />
      </label>
      <label>
        Latitude:
        <input
          type="number"
          step="any"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          placeholder="e.g. 22.5130"
          required
        />
      </label>
      <label>
        Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Safe">Safe</option>
          <option value="Caution">Caution</option>
          <option value="SOS">SOS</option>
        </select>
      </label>
      <button type="submit" style={{ marginTop: "10px" }}>Add Tourist</button>
    </form>
  );
};

export default TouristForm;
