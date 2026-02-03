import CompanyData from "../data/companyData";
import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { riskCategories } from "../data/riskCategories";
import { useState, useEffect } from "react";

// Component to display and assess risk details of a specific company
const CompanyRiskDetails = ({ companies, setCompanies }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const company = companies.find((c) => c.id == id);

  useEffect(() => {
  fetch(`http://localhost:8000/api/articles/${id}`)
    .then(res => res.json())
    .then(data => {
      console.log("Article data:", data);
      // Optionally update state with fetched data if needed
      // setArticleData(data);
    })
    .catch(err => console.error("Error fetching article:", err));
}, [id]);

  // Helper to map riskLevel to dropdown value
  const getRiskDropdownValue = (riskLevel) => {
    if (riskLevel === 1) return "low";
    if (riskLevel === 2) return "medium";
    return "high";
  };

  // Helper to map dropdown value back to riskLevel number
  const getRiskNumber = (riskString) => {
    let riskLevelNum = 100;
    if (riskString === "low") riskLevelNum = 25;
    else if (riskString === "medium") riskLevelNum = 50;
    return riskLevelNum;
  };

  // State for risk level and category selections
  const [riskLevel, setRiskLevel] = useState(
    getRiskDropdownValue(company.riskLevel)
  );
  const [riskCategory, setRiskCategory] = useState(company.riskCategory);

  const handleAssess = () => {
    //ASSESS LOGIC HERE
    //changes in risk level and category should get saved in DB

    // Temporary save in companyData file
    /*
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === Number(id)
          ? {
              ...company,
              riskLevel: getRiskNumber(riskLevel),
              riskCategory: riskCategory,
              assessed: true,
            }
          : company
      )
    );

    console.log("Saved", riskLevel, riskCategory);
    //---------------------
    */
   console.log("Saved", getRiskNumber(riskLevel), riskCategory);
   fetch(`http://localhost:8000/api/articles/${id}/review`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    manual_decision: riskCategory,
    manual_comment: 'Optional comment',
    risk_level: getRiskNumber(riskLevel)
  })
})
  };

  const handleDelete = () => {
    //DELETE LOGIC HERE
    //deletion should be done in DB 

    const ok = window.confirm("Are you sure you want to permenently delete this article from the database?");
    if (!ok) return;
    
    // Call API to delete article from database
    fetch(`http://localhost:8000/api/articles/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        console.log("Delete response:", data);
        alert("Article deleted successfully");
        navigate("/"); // Navigate back to home after deletion
      })
      .catch(err => {
        console.error("Error deleting article:", err);
        alert("Failed to delete article");
      });
  };


  return (
    <div>
      <PageHeader />
      <div className="risk-details-body">
        <div
          className="button back"
          onClick={() => navigate("/")}
          style={{ display: "flex", alignItems: "center", gap: "5px" }}
        >
          <ArrowLeft size={20} />
          Back
        </div>
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
            <div className="button assess-button" onClick={handleAssess}>
              Assessed
            </div>
            <select
              className="button assess-dropdown"
              name="riskLevel"
              value={riskLevel}
              onChange={(e) => setRiskLevel(e.target.value)}
            >
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
            <select
              className="button assess-dropdown"
              name="riskCategory"
              value={riskCategory}
              onChange={(e) => setRiskCategory(e.target.value)}
            >
              {riskCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="button delete-button" title="Delete article from database permanently" onClick={handleDelete}>
              Delete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyRiskDetails;
