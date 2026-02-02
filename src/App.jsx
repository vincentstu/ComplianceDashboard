import { useState } from "react";
import "./App.css";
import PageHeader from "./components/PageHeader";
import RiskPage from "./components/RiskPage";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CompanyRiskDetails from "./pages/CompanyRiskDetails";
import CompanyAssessmentDetails from "./pages/CompanyAssessmentDetails";
import mockData from "./data/companyData";
import { useEffect } from "react";

function App() {
  const [companies, setCompanies] = useState([]);

  //temporary mock data, to be replaced with proper database stuff
  useEffect(() => {
    setCompanies(mockData);
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home companies={companies} />} />
        <Route
          path="/details/:id"
          element={
            <CompanyRiskDetails
              companies={companies}
              setCompanies={setCompanies}
            />
          }
        />
        <Route
          path="/assessment-details/:id"
          element={<CompanyAssessmentDetails companyData={companies} />}
        />
      </Routes>
    </div>
  );
}

export default App;
