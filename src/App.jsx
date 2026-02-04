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

// Helper function to map risk score to risk level
function mapRiskScoreToLevel(score) {
  if (score === 0) return 0;
  if (score === 25) return 1;
  if (score === 50) return 2;
  if (score === 100) return 3;
  return 0; // Default fallback
}

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
    date: new Date().toLocaleDateString("de-DE"), // Uses current date; adjust if API provides a date field
    reasoning: article.reasoning || "No reasoning provided.",
    summary: article.text || "No summary available.",
    link: article.link || "",
    verified: article.verified ?? false,
  }));
}

// The main application component that sets up routing and state management
function App() {

  // Article data set
  const [companies, setCompanies] = useState([]);

  /*temporary mock data, to be replaced with proper database stuff
  useEffect(() => {
    setCompanies(mockData);
  }, []);
  */

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
  
  //one time test fetch
  
 fetch("http://localhost:8000/api/articles")
  .then(res => res.json())
  .then(data => {
    console.log(data);
  })
  .catch(err => console.error(err));
  

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
