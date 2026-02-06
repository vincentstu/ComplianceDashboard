import Tag from "./Tag";
import {tags} from "../data/tags";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { riskCategories } from "../data/riskCategories";

// Component to display and manage a section of tags
const TagsSection = ({ activeTags, setActiveTags }) => {
  const [expandCategories, setExpandCategories] = useState(false);

  function toggleTag(tag) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  return (
    <div className="tag-section">
      <p className="prim-risk-text bold-text">Tags</p>
      {tags.map((tag) => (
        <Tag
          tag={tag}
          classes={`${activeTags.includes(tag) ? "active-tag" : ""}`}
          onClick={() => toggleTag(tag)}
        />
      ))}
      <div
        className="category-tags-header"
        onClick={() => setExpandCategories(!expandCategories)}
      >
        <p className="prim-risk-text bold-text">Category Tags</p>
        <ChevronDown 
          size={20} 
          style={{ 
            transform: expandCategories ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s"
          }} 
        />
      </div>
      {expandCategories && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "10px" }}>
          {riskCategories.map((tag) => (
            <Tag
              tag={tag.toLowerCase()}
              classes={`${activeTags.includes(tag) ? "active-tag" : ""}`}
              onClick={() => toggleTag(tag)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TagsSection;
