import React from "react";
import { riskNumToString } from "../utils/helpers";
// Component to display aggregated assessment information for a company
const AssesmentCard = ({ companyData, allCompanies, onClick }) => {
  // Get all entries for this company and sum their weighted risk levels
  const companyEntries = allCompanies.filter((c) => c.name === companyData.name);
  
  // Apply weights: Low=1, Medium=2, High=3
  const weights = { 1: 1, 2: 2, 3: 4 };
  
  // Calculate total weighted sum and assessment level percentage
  const totalWeightedSum = companyEntries.reduce((sum, c) => {return sum + weights[c.riskLevel] || 0}, 0);
  const maxPossibleWeight = 4 * companyEntries.length; // Maximum weight if all entries are High Risk
  const assessmentLevelPercentage = (totalWeightedSum / maxPossibleWeight) * 100;
  const aggregatedRiskLevel = assessmentLevelPercentage < 34 ? 1 : assessmentLevelPercentage < 67 ? 2 : 3;
  
  return (
    <div className="assessment-card" onClick={onClick}>
      <div className="assessment-card-company-info">
        <p className="sec-assessment-text muted-text">Company:</p>
        <p className="prim-assessment-text bold-text">{companyData.name}</p>
        <p className="sec-assessment-text muted-text">Aggregated Risk Score:</p>
        <p className="prim-assessment-text">
          {Math.round(assessmentLevelPercentage)}%
        </p>
      </div>
      <div className="assessment-card-level">
        <p
          className={`assessment-text bold-text ${
            aggregatedRiskLevel === 1
              ? "low-risk"
              : aggregatedRiskLevel === 2
              ? "med-risk"
              : "high-risk"
          }`}
        >
          {riskNumToString(aggregatedRiskLevel)}
        </p>
      </div>
    </div>
  );
};
export default AssesmentCard;
