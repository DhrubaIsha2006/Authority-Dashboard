import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TouristDetailPage from "./pages/TouristDetailPage";
import EFIRFormPage from "./pages/EFIRFormPage";

function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
          <Route path="/tourist/:id" element={<TouristDetailPage />} />
            <Route path="/efir/:alertId" element={<EFIRFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
