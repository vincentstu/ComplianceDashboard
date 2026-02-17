import React from "react";
import { riskNumToString, calculateAssessmentLevel } from "../utils/helpers";

// Component to display aggregated assessment information for a company
const AssesmentCard = ({ companyData, allCompanies, onClick }) => {
  
  const { assessmentLevelPercentage, aggregatedRiskLevel } = calculateAssessmentLevel(companyData.name, allCompanies);

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
            aggregatedRiskLevel === 0
            ? "no-risk"
            : aggregatedRiskLevel === 1
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
