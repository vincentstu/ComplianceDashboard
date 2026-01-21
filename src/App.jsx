import { useState } from "react";
import "./App.css";
import PageHeader from "./components/PageHeader";
import RiskPage from "./components/RiskPage";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CompanyRiskDetails from "./pages/CompanyRiskDetails";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<CompanyRiskDetails />} />
      </Routes>
    </div>
  );
}

export default App;
