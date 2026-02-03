import React from "react";
import { useNavigate } from "react-router-dom";
import TabBar from "./TabBar";
import SearchBar from "./SearchBar";
import AssesmentCard from "./AssessmentCard";
import TagsSection from "./TagsSection";

import { useState } from "react";

const AssessmentPage = ({ companies }) => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("company");
  const navigate = useNavigate();
  const [activeTags, setActiveTags] = useState([]);

  //calculate aggregated risk level for company
  function calculateAssessmentLevel(companyName) {
    const companyEntries = companies.filter((c) => c.name === companyName);
    const weights = { 1: 1, 2: 2, 3: 4 };
    const sum = companyEntries.reduce(
      (acc, c) => acc + weights[c.riskLevel] || 0,
      0
    );
    
    // calculate assessment level percentage
    const maxPossibleWeight = weights[3] * companyEntries.length; // Maximum weight if all entries are High Risk
    const assessmentLevelPercentage = (sum / maxPossibleWeight) * 100;
    const aggregatedRiskLevel =
      assessmentLevelPercentage < 34
        ? 1
        : assessmentLevelPercentage < 67
        ? 2
        : 3;

    return { assessmentLevelPercentage, aggregatedRiskLevel };
  }

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

  const resultCount = uniqueCompanies.length;

  function riskLevel(level) {
    if (level === 1) {
      return "low risk";
    } else if (level === 2) {
      return "medium risk";
    } else {
      return "high risk";
    }
  }

  function matchesTags(company, activeTags) {
    if (activeTags.length === 0) return true;

    /* Risk level */
    return activeTags.includes(riskLevel(company.riskLevel));
  }

// Filter companies based on search and active tags
  const filteredCompanyData = uniqueCompanies
    .filter((company) =>
      company.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((company) => matchesTags(company, activeTags));

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
            const rA = calculateAssessmentLevel(a.name).aggregatedRiskLevel;
            const rB = calculateAssessmentLevel(b.name).aggregatedRiskLevel;
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
        <TagsSection activeTags={activeTags} setActiveTags={setActiveTags} />
      </div>
    </>
  );
};
export default AssessmentPage;
