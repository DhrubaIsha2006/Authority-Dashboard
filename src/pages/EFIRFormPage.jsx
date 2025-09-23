import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

import alertsData from "../data/alerts.json";
import tourists from "../data/tourists.json";

const EFIRFormPage = () => {
  const { alertId } = useParams();
  const navigate = useNavigate();

  const alert = alertsData.find((a) => a.id === alertId);
  const tourist = tourists.find((t) => t.id === alert?.touristId);

  const [form, setForm] = useState({
    touristName: tourist?.name || "",
    touristId: tourist?.id || "",
    alertType: alert?.type || "",
    time: alert?.time || "",
    location: `${alert?.lat}, ${alert?.lng}` || "",
    officer: "Officer Name",
    remarks: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const mockTx = `0x${Math.random().toString(16).slice(2, 12)}`;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("e-FIR Report", 20, 20);
    doc.setFontSize(11);
    doc.text(`Tourist: ${form.touristName} (${form.touristId})`, 20, 40);
    doc.text(`Alert Type: ${form.alertType}`, 20, 52);
    doc.text(`Time: ${form.time}`, 20, 64);
    doc.text(`Location: ${form.location}`, 20, 76);
    doc.text(`Officer in Charge: ${form.officer}`, 20, 88);
    doc.text(`Remarks: ${form.remarks}`, 20, 100);
    doc.text(`Blockchain Proof: ${mockTx}`, 20, 112);
    doc.save("efir.pdf");
    navigate("/dashboard");
  };

  if (!alert || !tourist) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold mb-4">Alert not found</h2>
        <Link to="/dashboard" className="small-btn">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">e-FIR Form</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Tourist Name</label>
            <input
              name="touristName"
              value={form.touristName}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Tourist ID</label>
            <input
              name="touristId"
              value={form.touristId}
              readOnly
              className="w-full border rounded p-2 bg-slate-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Alert Type</label>
            <input
              name="alertType"
              value={form.alertType}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Time</label>
            <input
              name="time"
              value={form.time}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Officer in Charge</label>
            <input
              name="officer"
              value={form.officer}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Remarks</label>
            <textarea
              name="remarks"
              value={form.remarks}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        </form>

        <div className="mt-6 flex gap-3">
          <button onClick={handleSubmit} className="small-btn">
            Submit & Generate FIR
          </button>
          <Link to="/dashboard" className="small-btn bg-white border border-slate-300 text-slate-700">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EFIRFormPage;
