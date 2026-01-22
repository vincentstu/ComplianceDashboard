import React from 'react';
const AssesmentCard = ({ companyData, onClick }) => {
    const assessmentLevelPercentage = (companyData.riskLevel / 3) * 100; //Berechnungslogik
    return (
        <div className="assessment-card" onClick={onClick}>
            <div className="assessment-card-company-info">
                <p className="sec-assessment-text muted-text">Company:</p>
                <p className="prim-assessment-text bold-text">{companyData.name}</p>
                <p className="sec-assessment-text muted-text">Aggregated Risk Score:</p>
                <p className="prim-assessment-text">{Math.round(assessmentLevelPercentage)}%</p>
            </div>
            <div className="assessment-card-level">
                <p
                    className={`assessment-text bold-text ${
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
            </div>
        </div>
    );
};
export default AssesmentCard;