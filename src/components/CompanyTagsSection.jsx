import Tag from "./Tag";
import {companyTags} from "../data/tags";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

// Component to display and manage a section of tags
const CompanyTagsSection = ({ activeTags, setActiveTags }) => {
  // State to manage the expansion of category tags
  const [expandCategories, setExpandCategories] = useState(false);

  // Function to toggle the active state of a tag
  function toggleTag(tag) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  return (
    <div className="tag-section">
      <p className="prim-risk-text bold-text">Tags</p>
      <div className="tags-section-tags">
      {companyTags.map((tag) => (
        <Tag
          tag={tag}
          classes={`${activeTags.includes(tag) ? "active-tag" : ""}`}
          onClick={() => toggleTag(tag)}
        />
      ))}
      </div>
    </div>
  );
};

export default CompanyTagsSection;
