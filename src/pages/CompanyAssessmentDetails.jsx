import CompanyData from "../data/companyData";
import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Component to display detailed assessment of a company
const CompanyAssessmentDetails = ({ companyData }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const company = companyData.find((c) => c.id == id);

  // Get all entries for this company and sum their risk levels
  const companyEntries = companyData.filter((c) => c.name === company?.name);
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

  return (
    <div>
      <PageHeader />
      <div className="assessment-details-body">
        <div
          className="button back"
          onClick={() => navigate("/")}
          style={{ display: "flex", alignItems: "center", gap: "5px" }}
        >
          <ArrowLeft size={20} />
          Back
        </div>
        <div className="assessment-details-title">
          <h1>{company?.name}</h1>
        </div>
        <div className="assessment-details-content">
          <div className="assessment-details-first-section">
            <p className="sec-assessment-text">Aggregated Risk Score:</p>
            <p className="prim-assessment-text">
              {Math.round(assessmentLevelPercentage)}%
            </p>
          </div>
          <div className="assessment-details-first-section">
            <p className="sec-assessment-text">
              Total Articles: {totalArticleCount}
            </p>
          </div>
          <div className="assessment-details-first-section">
            <p className="high-risk sec-assessment-text">
              High Risk: {highRiskCount}
            </p>
          </div>
          <div className="assessment-details-first-section">
            <p className="med-risk sec-assessment-text">
              Medium Risk: {mediumRiskCount}
            </p>
          </div>
          <div className="assessment-details-first-section">
            <p className="low-risk sec-assessment-text">
              Low Risk: {lowRiskCount}
            </p>
          </div>
          <div className="assessment-details-first-section">
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
      </div>
    </div>
  );
};
export default CompanyAssessmentDetails;
