import CompanyData from "../data/companyData";
import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { useNavigate } from "react-router-dom";

const CompanyRiskDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const company = CompanyData.find((c) => c.id == id);

  // Helper to map riskLevel to dropdown value
  const getRiskDropdownValue = (riskLevel) => {
    if (riskLevel === 1) return "low";
    if (riskLevel === 2) return "medium";
    return "high";
  };

  return (
    <div>
      <PageHeader />
      <div className="risk-details-body">
        <p className="button back" onClick={() => navigate("/")}>
          Back
        </p>
        <div className="risk-details-title">
          <h1>{company.name}</h1>
          <p>{company.date}</p>
        </div>
        <div className="risk-details-content">
          <div className="risk-details-first-section">
            <div className="risk-details-section">
              <p className="sec-risk-text muted-text">Risk Category:</p>
              <p className="prim-risk-text">{company.riskCategory}</p>
            </div>
            <div className="risk-details-section" style={{ alignItems: "end" }}>
              <p className="sec-risk-text muted-text">
                Time period of article:
              </p>
              <p className="prim-risk-text">{company.date}</p>
            </div>
          </div>
          <div className="risk-details-section">
            <p className="sec-risk-text muted-text">Reasoning:</p>
            <p className="prim-risk-text">{company.reasoning}</p>
          </div>
          <div className="risk-details-section">
            <p className="sec-risk-text muted-text">Summary:</p>
            <p className="prim-risk-text">{company.summary}</p>
          </div>
          <div className="risk-details-section">
            <p className="sec-risk-text muted-text">Link to article:</p>
            <a
              href="https://www.tagesschau.de/ausland/amerika/usa-oeltanker-102.html"
              className="prim-risk-text"
            >
              {company.link}
            </a>
          </div>
          <div
            className="risk-details-section"
            style={{ flexDirection: "row", alignItems: "center", gap: "10px" }}
          >
            <div className="button assess-button">Assessed</div>
            <select
              className="button assess-dropdown"
              defaultValue={getRiskDropdownValue(company.riskLevel)}
            >
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyRiskDetails;
