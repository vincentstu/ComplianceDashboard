import React from "react";
// Component to display risk information for a company
const RiskCard = ({ companyData, onClick }) => {
  return (
    <div
      className={`risk-card ${
        companyData.assessed ? " risk-card-assessed" : ""
      }`}
      onClick={onClick}
    >
      <div className="risk-card-company-info">
        <p className="sec-risk-text muted-text">Company:</p>
        <p className="prim-risk-text bold-text">{companyData.name}</p>
        <p className="sec-risk-text muted-text">Risk Category:</p>
        <p className="prim-risk-text">{companyData.riskCategory}</p>
      </div>
      <div className="risk-card-level">
        <p
          className={`risk-text ${
            companyData.riskLevel === 1
              ? "low-risk"
              : companyData.riskLevel === 2
              ? "med-risk"
              : "high-risk"
          }`}
        >
          {companyData.riskLevel === 1
            ? "Low Risk"
            : companyData.riskLevel === 2
            ? "Medium Risk"
            : "High Risk"}
        </p>
        <p className="sec-risk-text muted-text">{companyData.date}</p>
      </div>
    </div>
  );
};

export default RiskCard;
