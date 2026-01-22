import React from "react";
import { useNavigate } from "react-router-dom";
import TabBar from "./TabBar";
import SearchBar from "./SearchBar";
import RiskCard from "./RiskCard";
import AssessmentPage from "./AssessmentPage";

import { useState } from "react";
import companies from "../data/companyData";

const RiskPage = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("risk");
  const navigate = useNavigate();

  const filteredCompanyData = companies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="content-body">
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "risk" && (
        <>
          <div className="search-section">
            <div>
              <p className="result-text">Results</p>
            </div>
            <div>
              <SearchBar value={search} onChange={setSearch} />
            </div>
          </div>
          <div className="risk-cards">
            {filteredCompanyData
              .slice()
              .sort((a, b) => b.riskLevel - a.riskLevel)
              .map((companyData) => (
                <RiskCard
                  key={companyData.id}
                  companyData={companyData}
                  onClick={() => navigate(`/details/${companyData.id}`)}
                />
              ))}
          </div>
        </>
      )}
      {activeTab === "company" && <AssessmentPage />}
    </div>
  );
};

export default RiskPage;
