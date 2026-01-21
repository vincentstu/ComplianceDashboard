import React from "react";
import { useNavigate } from "react-router-dom";
import TabBar from "./TabBar";
import SearchBar from "./SearchBar";
import RiskCard from "./RiskCard";
import TagsSection from "./TagsSection";

import { useState } from "react";
import companies from "../data/companyData";

const RiskPage = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredCompanyData = companies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="content-body">
      <TabBar />
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
      <TagsSection />
    </div>
  );
};

export default RiskPage;
