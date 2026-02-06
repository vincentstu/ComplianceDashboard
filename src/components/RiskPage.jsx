import React from "react";
import { useNavigate } from "react-router-dom";
import TabBar from "./TabBar";
import SearchBar from "./SearchBar";
import RiskCard from "./RiskCard";
import AssessmentPage from "./AssessmentPage";
import TagsSection from "./TagsSection";
import { riskCategories } from "../data/riskCategories";
import { formatDate } from "../utils/helpers";
import { riskNumToString, isToday, isThisWeek, isThisYear } from "../utils/helpers";

import { useState, useEffect } from "react";

// Component to display and filter risk information for companies
const RiskPage = ({ companies }) => {
  // Search input state
  const [search, setSearch] = useState("");
  // Active tab state: "risk" or "company"
  const [activeTab, setActiveTab] = useState("risk");
  const navigate = useNavigate();
  // Active tags state for filtering
  const [activeTags, setActiveTags] = useState([]);

  //Check if any active tag is a risk category
  function anyActiveCategory(activeTags) {
    return riskCategories.some(category => activeTags.includes(category));
  }

  // Check if a company matches the active tags
  function matchesTags(company, activeTags) {
    if (activeTags.length === 0) return true;

    const matchesRisk =
      activeTags.includes(riskNumToString(company.riskLevel).toLowerCase()) ||
      !(
        activeTags.includes("high risk") ||
        activeTags.includes("low risk") ||
        activeTags.includes("medium risk") ||
        activeTags.includes("no risk")
      );

    const matchesToday = !activeTags.includes("today") || isToday(formatDate(company.date));
    const matchesThisWeek = !activeTags.includes("this week") || isThisWeek(formatDate(company.date));
    const matchesThisYear = !activeTags.includes("this year") || isThisYear(formatDate(company.date));

    const companyCategories = company.riskCategory.split(",").map(cat => cat.trim().toLowerCase());
    const matchesCategory = 
      activeTags.some(tag => companyCategories.includes(tag.toLowerCase())) ||
      !anyActiveCategory(activeTags);
    
    return matchesRisk && matchesToday && matchesCategory && matchesThisWeek && matchesThisYear; 
  }

  // Filter companies based on search input and active tags
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
                    // Navigate to details page on card click
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
