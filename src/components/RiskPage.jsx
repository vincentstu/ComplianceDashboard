import React from "react";
import { useNavigate } from "react-router-dom";
import TabBar from "./TabBar";
import SearchBar from "./SearchBar";
import RiskCard from "./RiskCard";
import AssessmentPage from "./AssessmentPage";
import TagsSection from "./TagsSection";
import { riskCategories } from "../data/riskCategories";
import { formatDate } from "../utils/helpers";

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

  function isThisWeek(date) {
  // Accepts date string in format 'DD.MM.YYYY'
  const [day, month, year] = date.split(".");
  const inputDate = new Date(Number(year), Number(month) - 1, Number(day));
  const today = new Date();

  // Get Monday of current week
  const firstDayOfWeek = new Date(today);
  firstDayOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday

  // Get Sunday of current week
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6); // Sunday

  // Check if inputDate is between Monday and Sunday (inclusive)
  return inputDate >= firstDayOfWeek && inputDate <= lastDayOfWeek;
}

function isThisYear(date) {
  // Accepts date string in format 'DD.MM.YYYY'
  const [day, month, year] = date.split(".");
  const today = new Date();
  return today.getFullYear() === Number(year);
}

 

  function anyActiveCategory(activeTags) {
    return riskCategories.some(category => activeTags.includes(category));
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

      console.log("company risk: " + riskLevel(company.riskLevel));
      console.log("matches risk: " + matchesRisk);

    const matchesToday = !activeTags.includes("today") || isToday(formatDate(company.date));
    const matchesThisWeek = !activeTags.includes("this week") || isThisWeek(formatDate(company.date));
    const matchesThisYear = !activeTags.includes("this year") || isThisYear(formatDate(company.date));
    const companyCategories = company.riskCategory.split(",").map(cat => cat.trim().toLowerCase());
    const matchesCategory = 
      activeTags.some(tag => companyCategories.includes(tag.toLowerCase())) ||
      !anyActiveCategory(activeTags);
    
    console.log(matchesRisk);
    console.log(matchesToday);
    console.log(matchesThisWeek);
    console.log(matchesCategory);
    console.log(matchesThisYear);
    
    return matchesRisk && matchesToday && matchesCategory && matchesThisWeek && matchesThisYear; 
  }

  const filteredCompanyData = companies
   // .filter((company) =>
    //company.riskLevel !== 0
  //)
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
