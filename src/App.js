<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
=======
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
>>>>>>> 05fe2464aa1ee92116b9ef0c87f67222ee1a6f33
import TouristDetailPage from "./pages/TouristDetailPage";
import EFIRFormPage from "./pages/EFIRFormPage";

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<LoginPage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
          <Route path="/tourist/:id" element={<TouristDetailPage />} />
=======
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tourist/:id" element={<TouristDetailPage />} />
>>>>>>> 05fe2464aa1ee92116b9ef0c87f67222ee1a6f33
            <Route path="/efir/:alertId" element={<EFIRFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;

