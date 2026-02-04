import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import { useEffect, useState } from "react";
import RiskCard from "../components/RiskCard";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";


// Component to display detailed assessment of a company
const CompanyAssessmentDetails = ({ companyData }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const company = companyData.find((c) => c.id == id);
  const [selectedRiskFilter, setSelectedRiskFilter] = useState("all");

  // Get all entries for this company and sum their risk levels
  const companyEntries = companyData.filter((c) => c.name === company?.name);
  console.log(companyEntries);
  const categoryCounts = companyEntries.reduce((acc, entry) => {
    acc[entry.riskCategory] = (acc[entry.riskCategory] || 0) + 1;
    return acc;
  }, {});
  

  // Calculate weighted risk score
  const weights = { 1: 1, 2: 2, 3: 4 };
  const totalWeightedSum = companyEntries.reduce((sum, c) => {
    return sum + (weights[c.riskLevel] || 0);
  }, 0);
  const maxPossibleWeight = 4 * companyEntries.length; // Maximum weight if all entries are High Risk
  const assessmentLevelPercentage =
    (totalWeightedSum / maxPossibleWeight) * 100;

  const totalArticleCount = companyEntries.length;

  const highRiskCount = companyEntries.filter((c) => c.riskLevel === 3).length;
  const mediumRiskCount = companyEntries.filter(
    (c) => c.riskLevel === 2
  ).length;
  const lowRiskCount = companyEntries.filter((c) => c.riskLevel === 1).length;

  const formula = "Weighted Risk Score = (Sum of (Risk Level Weight × Number of Articles at that Level)) / (Maximum Possible Weight) × 100%";

  const data = [
  { name: "Low Risk", number_of_articles: lowRiskCount },
  { name: "Medium Risk", number_of_articles: mediumRiskCount },
  { name: "High Risk", number_of_articles: highRiskCount },
];

  // Filter articles based on selected risk level
  const getFilteredArticles = () => {
    if (!selectedRiskFilter) return [];
    if (selectedRiskFilter === "all") return companyEntries;
    if (selectedRiskFilter === "high") return companyEntries.filter((c) => c.riskLevel === 3);
    if (selectedRiskFilter === "medium") return companyEntries.filter((c) => c.riskLevel === 2);
    if (selectedRiskFilter === "low") return companyEntries.filter((c) => c.riskLevel === 1);
    return [];
  };
  return (
    <div>
      <PageHeader />
      <div className="assessment-details-body">
        <div
          className="button back"
          onClick={() => navigate(-1)}
          style={{ display: "flex", alignItems: "center", gap: "5px" }}
        >
          <ArrowLeft size={20} />
          Back
        </div>
        <div className="assessment-details-title">
          <h1>{company?.name}</h1>
        </div>
        <div className="assessment-details-content">
          <div className="assessment-details-stats">
          <div className="assessment-details-first-section">
            <p className="sec-assessment-text">Aggregated Risk Score:</p>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="prim-assessment-text">
                {Math.round(assessmentLevelPercentage)}%
              </span>
              <span title={`Aggregated risk score based on all articles for this company. Risk score is calculated by using the following formula: ${formula}`}>
              <Info 
                size={18} 
                style={{ cursor: "pointer", color: "#666" }}
              />
              </span>
            </div>
          </div>
          <div className="assessment-details-first-section" onClick={() => setSelectedRiskFilter("all")} style={{ cursor: "pointer" }}>
            <p className="sec-assessment-text">
              Total Articles: {totalArticleCount}
            </p>
          </div>
          <div className="assessment-details-first-section" onClick={() => setSelectedRiskFilter("high")} style={{ cursor: "pointer" }}>
            <p className="high-risk sec-assessment-text">
              High Risk: {highRiskCount}
            </p>
          </div>
          <div className="assessment-details-first-section" onClick={() => setSelectedRiskFilter("medium")} style={{ cursor: "pointer" }}>
            <p className="med-risk sec-assessment-text">
              Medium Risk: {mediumRiskCount}
            </p>
          </div>
          <div className="assessment-details-first-section" onClick={() => setSelectedRiskFilter("low")} style={{ cursor: "pointer" }}>
            <p className="low-risk sec-assessment-text">
              Low Risk: {lowRiskCount}
            </p>
          </div>
          <div className="assessment-details-last-section">
            <p className="assessment-text muted-text">Associated Topics:</p>
            <p className="assessment-text">
              {Object.entries(categoryCounts).map(([category, count]) => (
                <div key={category}>
                  {category} ({count})
                </div>
              ))}
            </p>
          </div>
          </div>
          <div className="assessment-details-overview">
            Article Risk Spread:
 <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="number_of_articles" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
          </div>
        </div>
      
      {selectedRiskFilter && (
        <div className="articles-section" >
          <h2>{selectedRiskFilter === "all" ? "All Articles" : `${selectedRiskFilter.charAt(0).toUpperCase() + selectedRiskFilter.slice(1)} Risk Articles`}</h2>
          <div style={{ marginTop: "15px", display: "flex", flexDirection: "column", gap: "15px" }}>
            {getFilteredArticles().length > 0 ? (
              getFilteredArticles().map((article, idx) => (
                <RiskCard
                  key={idx}
                  companyData={article}
                  onClick={() => navigate(`/details/${article.id}`)}
                />
              ))
            ) : (
              <p>No articles found</p>
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
export default CompanyAssessmentDetails;
