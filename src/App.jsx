import { useState } from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CompanyRiskDetails from "./pages/CompanyRiskDetails";
import CompanyAssessmentDetails from "./pages/CompanyAssessmentDetails";
import { useEffect } from "react";
import { mapRiskScoreToLevel } from "./utils/helpers";

// Transform API article format to dashboard company format and remove duplicates
function transformArticlesToCompanies(articles) {
  // Remove duplicates by keeping only the first occurrence of each id
  const seenIds = new Set();
  const uniqueArticles = articles.filter((article) => {
    if (seenIds.has(article.id)) {
      return false;
    }
    seenIds.add(article.id);
    return true;
  });

  return uniqueArticles.map((article) => ({
    id: article.id,
    name: article.company || "Unknown Company",
    riskCategory: article.risk_category || "Uncategorized",
    riskLevel: mapRiskScoreToLevel(article.risk_score ?? 0),
    date: article.published_at, // Uses current date; adjust if API provides a date field
    reasoning: article.reasoning || "No reasoning provided.",
    summary: article.text || "No summary available.",
    link: article.link || "",
    verified: article.verified ?? false,
  }));
}

// The main application component that sets up routing and state management
function App() {

  // Article data set state
  const [companies, setCompanies] = useState([]);

  // get article data from database and save it in state  
  useEffect(() => {
    fetch("http://localhost:8000/api/articles")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const transformedData = transformArticlesToCompanies(data);
          setCompanies(transformedData);
          console.log("Transformed articles:", transformedData);
        }
      })
      .catch((err) => console.error("Error fetching articles:", err));
  }, []);
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home companies={companies} />} />
        <Route
          path="/details/:id"
          element={
            <CompanyRiskDetails/>
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
