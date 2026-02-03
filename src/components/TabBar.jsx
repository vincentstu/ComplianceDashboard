import React from "react";

// TabBar component to switch between Risk Feed and Company Assessment tabs
const TabBar = ({ activeTab, onTabChange }) => {
  return (
    <div className="tab-bar">
      <div
        className={`riskfeed-tab ${activeTab === "risk" ? "active-tab" : ""}`}
        onClick={() => onTabChange("risk")}
      >
        Risk Feed
      </div>
      <div
        className={`company-tab ${activeTab === "company" ? "active-tab" : ""}`}
        onClick={() => onTabChange("company")}
      >
        Company Assessment
      </div>
    </div>
  );
};

export default TabBar;
