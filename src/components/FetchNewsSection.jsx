import { useState } from "react";

const FetchNewsSection = () => {
  const [company, setCompany] = useState("");
  const [articleAmount, setArticleAmount] = useState(0);

  const handleFetch = async () => {
    if (!company) {
      alert("Please enter a company name");
      return;
    }
    if(articleAmount === 0 || isNaN(articleAmount) || articleAmount > 100){
      alert("Please enter a valid amount of articles to fetch");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/fetch-live?keyword=${company}&limit=${articleAmount}&provider=ndh`,
        {
          method: "POST",
        }
      );

      const data = await response.json();
      console.log("API Response:", data);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  return (
    <div className="tag-section fetch-offset">
      <p className="prim-risk-text bold-text">Fetch</p>

      <input
        className="fetch-company-input"
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Enter company name..."
      />
      <p className="prim-risk-text">Amount of Articles</p>
      <input className="fetch-company-amount" type="text" placeholder=""/>
      <button
        className="button fetch-run-button"
        onClick={handleFetch}
      >
        Run
      </button>
    </div>
  );
};

export default FetchNewsSection;
