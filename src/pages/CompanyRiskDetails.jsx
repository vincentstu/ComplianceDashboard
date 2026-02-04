import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { riskCategories } from "../data/riskCategories";
import { useState, useEffect } from "react";

// Component to display and assess risk details of a specific company
const CompanyRiskDetails = () => {
  const navigate = useNavigate();

  //get article id from url
  const { id } = useParams();

  //Fetch company data from backend
  const [companyFetch, setCompanyFetch] = useState(null);

  useEffect(() => {
  const fetchArticle = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/articles/${id}`);
      const data = await res.json();
      setCompanyFetch(data);
    } catch (err) {
      console.error("Error fetching article:", err);
    }
  };
  fetchArticle();
}, [id]);

//Helper to map risk_score to risk level string
const getRiskLevelFetch = (risk_level) => {
  if (risk_level <= 25) return "low";
  if (risk_level <= 50) return "medium";
  return "high";
};

  // Helper to map dropdown value back to riskLevel number
  const getRiskNumber = (riskString) => {
    let riskLevelNum = 100;
    if (riskString === "low") riskLevelNum = 25;
    else if (riskString === "medium") riskLevelNum = 50;
    return riskLevelNum;
  };

  //Declare state for risk level and category
 const [riskLevel, setRiskLevel] = useState("");
const [riskCategory, setRiskCategory] = useState("");

useEffect(() => {
  if (companyFetch) {
    setRiskLevel(getRiskLevelFetch(companyFetch.risk_score));
    setRiskCategory(companyFetch.risk_category || "");
  }
}, [companyFetch]);

  

  const handleAssess = () => {
    //assess button functionality

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
    //delete button functionality

    const ok = window.confirm("Are you sure you want to permenently delete this article from the database?");
    if (!ok) return;
    
    // Call API to delete article from database
    fetch(`http://localhost:8000/api/articles/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        alert("Article deleted successfully");
        navigate("/"); // Navigate back to home after deletion
      })
      .catch(err => {
        console.error("Error deleting article:", err);
        alert("Failed to delete article");
      });
  };

  // Render loading state if company data is not yet fetched
  if(!companyFetch) {
    return <div>Loading...</div>;
  }

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
          <h1>{companyFetch.company_name}</h1>
          <p>No Date yet</p>
        </div>
        <div className="risk-details-content">
          <div className="risk-details-first-section">
            <div className="risk-details-section">
              <p className="sec-risk-text muted-text">Risk Category:</p>
              <p className="prim-risk-text">{companyFetch.risk_category}</p>
            </div>
            <div className="risk-details-section" style={{ alignItems: "end" }}>
              <p className="sec-risk-text muted-text">
                Time period of article:
              </p>
              <p className="prim-risk-text">No date yet</p>
            </div>
          </div>
          <div className="risk-details-section">
            <p className="sec-risk-text muted-text">Reasoning:</p>
            <p className="prim-risk-text">{companyFetch.reasoning}</p>
          </div>
          <div className="risk-details-section">
            <p className="sec-risk-text muted-text">Summary:</p>
            <p className="prim-risk-text">{companyFetch.summary}</p>
          </div>
          <div className="risk-details-section">
            <p className="sec-risk-text muted-text">Link to article:</p>
            <a
              href="https://www.tagesschau.de/ausland/amerika/usa-oeltanker-102.html"
              className="prim-risk-text"
            >
              No link yet
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
