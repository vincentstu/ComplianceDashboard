import Tag from "./Tag";
import tags from "../data/tags";

const TagsSection = () => {
  return (
    <div className="tag-section">
      <p className="prim-risk-text bold-text">Tags</p>
      {tags.map((tag) => (
        <Tag tag={tag} />
      ))}
    </div>
  );
};

export default TagsSection;
