import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Flag, FlagTriangleRight } from "lucide-react";
import { riskCategories } from "../data/riskCategories";
import { useState, useEffect } from "react";
import { formatDate } from "../utils/helpers";
import { ChevronDown } from "lucide-react";

// Component to display and assess risk details of a specific company
const CompanyRiskDetails = () => {
  const navigate = useNavigate();

  //get article id from url
  const { id } = useParams();

  //Fetch company data from backend
  const [companyFetch, setCompanyFetch] = useState(null);
  const [expandComments, setExpandComments] = useState(false);

  useEffect(() => {
  const fetchArticle = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/articles/${id}`);
      const data = await res.json();
      console.log(data);
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
const [comment, setComment] = useState("");

useEffect(() => {
  if (companyFetch) {
    setRiskLevel(getRiskLevelFetch(companyFetch.risk_score));
    setRiskCategory(companyFetch.risk_category || "");
    setComment(companyFetch.manual_comment || "");
  }
}, [companyFetch]);

  

  const handleAssess = () => {
    //assess button functionality
    const ok = window.confirm("Are you sure you want to assess this article?");
    if (!ok) return;

   fetch(`http://localhost:8000/api/articles/${id}/review`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
    manual_decision: riskCategory,
    manual_comment: comment,
    risk_level: getRiskNumber(riskLevel)
  })
}).then(res => res.json())
  .then(data => {
    alert("Article assessed successfully");
  })
  .catch(err => {
    console.error("Error assessing article:", err);
    alert("Failed to assess article");
  });
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
        navigate(-1); // Navigate back to previous page after deletion
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
          onClick={() => navigate(-1)}
          style={{ display: "flex", alignItems: "center", gap: "5px" }}
        >
          <ArrowLeft size={20} />
          Back
        </div>
        <div className="risk-details-title">
          <h1>{companyFetch.company_name || "Missing"}
            {companyFetch.verified && <span title="This article has already been assessed by a compliance officer." style={{cursor: "pointer"}}><FlagTriangleRight size={23}/></span>}</h1>
          <p>{formatDate(companyFetch.published_at)}</p>
        </div>
        <div className="risk-details-content">
          <div className="risk-details-first-section">
            <div className="risk-details-section">
              <p className="sec-risk-text muted-text">Risk Category:</p>
              <p className="prim-risk-text">{companyFetch.risk_category || "Missing"}</p>
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
            <p className="prim-risk-text">{companyFetch.reasoning || "Missing"}</p>
          </div>
          <div className="risk-details-section">
            <p className="sec-risk-text muted-text">Summary:</p>
            <p className="prim-risk-text">{companyFetch.summary || "Missing"}</p>
          </div>
          <div className="risk-details-section">
            <p className="sec-risk-text muted-text">Link to article:</p>
            <a
              href={companyFetch.url}
              className="prim-risk-text"
              target="_blank"
            >
              {companyFetch.url || "Missing"}
            </a>
          </div>
          <div className="assess-section">
      <div
        className="prim-risk-text"
        onClick={() => setExpandComments(!expandComments)}
        style={{display: "flex", alignItems: "center", cursor: "pointer"}}
      >
        View Compliance Comments
        <ChevronDown 
          size={20} 
          style={{ 
            transform: expandComments ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s"
          }} 
        />
      </div>
      {expandComments && (
        <div className="compliance-comments">
          {companyFetch.manual_comment || "No comments from compliance officers yet."}
        </div>
      )}
          <div
            className="risk-details-section"
            style={{ flexDirection: "row", alignItems: "center", gap: "10px" }}
          >
          
            <div className="button assess-button" onClick={handleAssess}>
              Assess
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
          <textarea className="comment-textarea" name="Comments" id="comments" placeholder="Write a comment here..." onChange={(e) => setComment(e.target.value)}></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyRiskDetails;
