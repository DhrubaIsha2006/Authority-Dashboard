import React from "react";
import { useParams, Link } from "react-router-dom";
import tourists from "../data/tourists.json";

const TouristDetailPage = () => {
  const { id } = useParams();
  const tourist = tourists.find((t) => t.id === id);

  if (!tourist) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold mb-4">Tourist not found</h2>
        <Link to="/dashboard" className="small-btn">Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">{tourist.name}</h2>
        <p className="text-slate-500 mb-6">Tourist ID: {tourist.id}</p>

        {/* KYC Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">KYC Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><strong>Nationality:</strong> {tourist.kyc?.nationality || "India"}</div>
            <div><strong>Document:</strong> {tourist.kyc?.document || "Aadhaar"} </div>
            <div><strong>Emergency Contact:</strong> {tourist.emergencyContact || "9876543210"}</div>
          </div>
        </div>

        {/* Itinerary */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Planned Itinerary</h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            {tourist.itinerary?.length > 0 ? (
              tourist.itinerary.map((spot, idx) => <li key={idx}>{spot}</li>)
            ) : (
              <li>No itinerary available</li>
            )}
          </ul>
        </div>

        {/* Status */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Current Status</h3>
          <p>
            <span
              className={`px-3 py-1 rounded text-white ${
                tourist.status === "SOS"
                  ? "bg-red-600"
                  : tourist.status === "Caution"
                  ? "bg-amber-500"
                  : "bg-emerald-600"
              }`}
            >
              {tourist.status}
            </span>
          </p>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <Link to="/dashboard" className="small-btn">← Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default TouristDetailPage;
