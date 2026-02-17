import React from "react";
import { useNavigate } from "react-router-dom";
import TabBar from "./TabBar";
import SearchBar from "./SearchBar";
import AssesmentCard from "./AssessmentCard";
import CompanyTagsSection from "./CompanyTagsSection";
import { riskNumToString } from "../utils/helpers";
import { calculateAssessmentLevel } from "../utils/helpers";

import { useState } from "react";

const AssessmentPage = ({ companies }) => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("company");
  const navigate = useNavigate();
  const [activeTags, setActiveTags] = useState([]);

  // Remove duplicate companies by name, keeping the one with highest risk level
  const uniqueCompanies = Array.from(
    new Map(
      companies
        .sort((a, b) => {
          b.riskLevel - a.riskLevel;
        })
        .map((c) => [c.name, c])
    ).values()
  );

  function matchesTags(company, activeTags) {
    if (activeTags.length === 0) return true;

    /* Risk level */
    return activeTags.includes(riskNumToString(company.riskLevel).toLowerCase());
  }

// Filter companies based on search and active tags
  const filteredCompanyData = uniqueCompanies
    .filter((company) =>
      company.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((company) => matchesTags(company, activeTags));

    // get number of results after filtering
    const resultCount = filteredCompanyData.length;

  return (
    <>
      <div className="search-section">
        <div>
          <p className="result-text">{resultCount} Results</p>
        </div>
        <div>
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </div>
      <div className="assessment-cards">
        {filteredCompanyData
          .slice()
          .sort((a, b) => {
            const rA = calculateAssessmentLevel(a.name, companies).aggregatedRiskLevel;
            const rB = calculateAssessmentLevel(b.name, companies).aggregatedRiskLevel;
            return rB - rA;
          })
          .map((companyData) => (
            <AssesmentCard
              key={companyData.id}
              companyData={companyData}
              allCompanies={companies}
              onClick={() => navigate(`/assessment-details/${companyData.id}`)}
            />
          ))}
        <CompanyTagsSection activeTags={activeTags} setActiveTags={setActiveTags} />
      </div>
    </>
  );
};
export default AssessmentPage;
