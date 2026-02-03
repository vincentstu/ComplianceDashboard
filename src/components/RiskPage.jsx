import React from "react";
import { useNavigate } from "react-router-dom";
import TabBar from "./TabBar";
import SearchBar from "./SearchBar";
import RiskCard from "./RiskCard";
import AssessmentPage from "./AssessmentPage";
import TagsSection from "./TagsSection";

import { useState, useEffect } from "react";

// Component to display and filter risk information for companies
const RiskPage = ({ companies }) => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("risk");
  const navigate = useNavigate();
  const [activeTags, setActiveTags] = useState([]);

 

  function riskLevel(level) {
    if (level === 1) {
      return "low risk";
    } else if (level === 2) {
      return "medium risk";
    } else if (level === 3) {
      return "high risk";
    } else {
      return "no risk";
    }
  }

// Check if the date corresponds to today
  function isToday(date) {
    // Accepts date string in format 'DD.MM.YYYY'
    const [day, month, year] = date.split(".");
    const today = new Date();
    return (
      today.getDate() === Number(day) &&
      today.getMonth() + 1 === Number(month) &&
      today.getFullYear() === Number(year)
    );
  }

  // Check if a company matches the active tags
  function matchesTags(company, activeTags) {
    if (activeTags.length === 0) return true;

    const matchesRisk =
      activeTags.includes(riskLevel(company.riskLevel)) ||
      !(
        activeTags.includes("high risk") ||
        activeTags.includes("low risk") ||
        activeTags.includes("medium risk") ||
        activeTags.includes("no risk")
      );
    const matchesToday = !activeTags.includes("today") || isToday(company.date);
    console.log(matchesRisk);
    console.log(matchesToday);
    return matchesRisk && matchesToday;
  }

  const filteredCompanyData = companies
    .filter((company) =>
      company.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((company) => matchesTags(company, activeTags));

     const resultCount = filteredCompanyData.length;

  return (
    <div className="content-body">
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "risk" && (
        <>
          <div className="search-section">
            <div>
              <p className="result-text">{resultCount} Results</p>
            </div>
            <div>
              <SearchBar value={search} onChange={setSearch} />
            </div>
          </div>
          <div className="risk-cards">
            {filteredCompanyData.length === 0 ? (
              <p className="no-result">No results</p>
            ) : (
              filteredCompanyData
                .slice()
                .sort((a, b) => b.riskLevel - a.riskLevel)
                .map((companyData) => (
                  <RiskCard
                    key={companyData.id}
                    companyData={companyData}
                    onClick={() => navigate(`/details/${companyData.id}`)}
                  />
                ))
            )}
            <TagsSection
              activeTags={activeTags}
              setActiveTags={setActiveTags}
            />
          </div>
        </>
      )}
      {activeTab === "company" && <AssessmentPage companies={companies} />}
    </div>
  );
};

export default RiskPage;
