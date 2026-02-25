import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FlagTriangleRight } from "lucide-react";
import { riskCategories } from "../data/riskCategories";
import { useState, useEffect } from "react";
import { riskNumToString } from "../utils/helpers";
import { ChevronDown } from "lucide-react";

import { mockData } from "../data/companyData";

// Component to display and assess risk details of a specific company
const CompanyRiskDetails = () => {
  const navigate = useNavigate();

  //get article id from url
  const { id } = useParams();

  //Fetch company data from backend
  const [companyFetch, setCompanyFetch] = useState(() => {
    const found = mockData.find((c) => String(c.id) === String(id));
    return found || null;
  });

  console.log(mockData);

  // State to manage compliance comments section expansion
  const [expandComments, setExpandComments] = useState(false);

  //Helper to map risk_score to risk level string
  const getRiskLevelFetch = (risk_level) => {
    if (risk_level === 0) return "no";
    if (risk_level <= 25) return "low";
    if (risk_level <= 50) return "medium";
    return "high";
  };

  // Helper to map dropdown value back to riskLevel number
  const getRiskNumber = (riskString) => {
    console.log("we are here", riskString);
    if (riskString === "Low Risk") return 1;
    else if (riskString === "Medium Risk") return 2;
    else if (riskString === "No Risk") return 0;
    return 3;
  };

  //Declare state for risk level, risk category and comment
  const [riskLevel, setRiskLevel] = useState(
    riskNumToString(companyFetch.riskLevel)
  );
  console.log(riskLevel);
  const [riskCategory, setRiskCategory] = useState(companyFetch.riskCategory);
  const [comment, setComment] = useState("");

  // Update risk level, category and comment state when companyFetch data is loaded

  // Handle assess button click to send assessment data to backend
  const handleAssess = () => {
    // Confirmation dialog before assessing the article
    const ok = window.confirm("Are you sure you want to assess this article?");
    if (!ok) return;

    // Update company in mockData
    const idx = mockData.findIndex((c) => String(c.id) === String(id));
    if (idx !== -1) {
      mockData[idx].verified = true;
      mockData[idx].riskCategory = riskCategory;
      mockData[idx].riskLevel = getRiskNumber(riskLevel);
      mockData[idx].manual_comment = comment;
    }
    // Optionally update local state
    setCompanyFetch({ ...mockData[idx] });
  };

  // Handle delete button click to delete article from database
  const handleDelete = () => {
    // Confirmation dialog before deleting the article
    const ok = window.confirm(
      "Are you sure you want to permenently delete this article from the database?"
    );
    if (!ok) return;

    // Call API to delete article from database
    fetch(`http://localhost:8000/api/articles/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Article deleted successfully");
        navigate(-1); // Navigate back to previous page after deletion
      })
      .catch((err) => {
        console.error("Error deleting article:", err);
        alert("Failed to delete article");
      });
  };

  // Render loading state if company data is not yet fetched
  if (!companyFetch) {
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <h1>{companyFetch.name || "Missing"}</h1>
            {companyFetch.verified && (
              <span
                title="This article has already been assessed by a compliance officer."
                style={{ cursor: "pointer" }}
              >
                <div className="assessed-label">Assessed</div>
              </span>
            )}
          </div>
          <p>{companyFetch.date}</p>
        </div>
        <div className="risk-details-content">
          <div className="risk-details-first-section">
            <div className="risk-details-section">
              <p className="sec-risk-text muted-text">Risk Category:</p>
              <p className="prim-risk-text">
                {companyFetch.riskCategory || "Missing"}
              </p>
            </div>
          </div>
          <div className="risk-details-section">
            <p className="sec-risk-text muted-text">Reasoning:</p>
            <p className="prim-risk-text">
              {companyFetch.reasoning || "Missing"}
            </p>
          </div>
          <div className="risk-details-section">
            <p className="sec-risk-text muted-text">Summary:</p>
            <p className="prim-risk-text">
              {companyFetch.summary || "Missing"}
            </p>
          </div>
          <div className="risk-details-section">
            <p className="sec-risk-text muted-text">Link to article:</p>
            <a
              href={companyFetch.link}
              className="prim-risk-text"
              target="_blank"
            >
              {companyFetch.link || "Missing"}
            </a>
          </div>
          <div className="assess-section">
            <div
              className="prim-risk-text"
              onClick={() => setExpandComments(!expandComments)}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              View Compliance Comment
              <ChevronDown
                size={20}
                style={{
                  transform: expandComments ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              />
            </div>
            {expandComments && (
              <div className="compliance-comments">
                {companyFetch.manual_comment ||
                  "No comments from compliance officers yet."}
              </div>
            )}
            <textarea
              className="comment-textarea"
              name="Comments"
              id="comments"
              placeholder="Write a comment here..."
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <div
              className="risk-details-section"
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                gap: "10px",
              }}
            >
              <div className="button assess-button" onClick={handleAssess}>
                Assess
              </div>
              {console.log(riskLevel, riskCategory)}
              <select
                className="button assess-dropdown"
                name="riskLevel"
                value={riskLevel}
                onChange={(e) => setRiskLevel(e.target.value)}
              >
                <option value="No Risk">No Risk</option>
                <option value="Low Risk">Low Risk</option>
                <option value="Medium Risk">Medium Risk</option>
                <option value="High Risk">High Risk</option>
              </select>
              <div className="risk-category-dropdown">
                {
                  // Split riskCategory string into array and render a dropdown for each category
                  riskCategory
                    .split(",")
                    .map((item) => item.trim())
                    .map((category, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <select
                          className="button assess-dropdown"
                          value={category}
                          onChange={(e) => {
                            const newValue = e.target.value;

                            setRiskCategory((prev) => {
                              const parts = prev
                                ? prev.split(",").map((p) => p.trim())
                                : [];

                              parts[index] = newValue;

                              return parts.join(", ");
                            });
                          }}
                        >
                          {riskCategories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>

                        {/* ➖ Remove Button */}
                        <div
                          className="button add-category-button"
                          onClick={() => {
                            setRiskCategory((prev) => {
                              const parts = prev
                                ? prev.split(",").map((p) => p.trim())
                                : [];

                              parts.splice(index, 1);

                              return parts.length > 0 ? parts.join(", ") : "";
                            });
                          }}
                        >
                          −
                        </div>
                      </div>
                    ))
                }

                {/* ➕ Add Category Button */}
                <div
                  className="button add-category-button"
                  style={{ marginTop: "8px" }}
                  onClick={() => {
                    setRiskCategory((prev) => {
                      if (!prev || prev.trim() === "") {
                        return "No Risk"; // first category
                      }
                      return prev + ", No Risk"; // append new default
                    });
                  }}
                >
                  Add
                </div>
              </div>
              <div
                className="button delete-button"
                title="Delete article from database permanently"
                onClick={handleDelete}
              >
                Delete Article
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyRiskDetails;
