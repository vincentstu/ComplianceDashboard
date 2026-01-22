import Tag from "./Tag";
import tags from "../data/tags";

const TagsSection = ({ activeTags, setActiveTags }) => {
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
    </div>
  );
};

export default TagsSection;
