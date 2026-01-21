import React from "react";
import KionLogo from "../assets/Kion_Group_logo.svg.png";
import ShieldIcon from "../assets/Icon.png";

const PageHeader = () => {
  return (
    <header className="page-header">
      <div className="title-section">
        <img src={ShieldIcon} alt="ShieldIcon" />
        <div>
          <h1 className="dashboard-title">Risk Assessment</h1>
          <h2 className="dashboard-subtitle">Business Partner risk analysis</h2>
        </div>
      </div>
      <img src={KionLogo} alt="Kion Group Logo" style={{ height: 50 }} />
    </header>
  );
};

export default PageHeader;
