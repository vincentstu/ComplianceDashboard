import React from "react";
import { useNavigate } from "react-router-dom";
import TabBar from "./TabBar";
import SearchBar from "./SearchBar";
import AssesmentCard from "./AssessmentCard";

import { useState } from "react";
import companies from "../data/companyData";

const AssessmentPage = () => {
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState("company");
    const navigate = useNavigate();
    const filteredCompanyData = companies.filter((company) =>
        company.name.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <>
            <div className="search-section">
                <div>
                    <p className="result-text">Results</p>
                </div>
                <div>
                    <SearchBar value={search} onChange={setSearch} />
                </div>
            </div>
            <div className="assessment-cards">
                {filteredCompanyData
                    .slice()
                    .sort((a, b) => b.riskLevel - a.riskLevel)
                    .map((companyData) =>(
                        <AssesmentCard
                            key={companyData.id}
                            companyData={companyData}
                            onClick={() => navigate(`/assessment-details/${companyData.id}`)}
                        />
                    ))}
            </div>  
        </>
    );
};
export default AssessmentPage;
