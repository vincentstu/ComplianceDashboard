const Tag = ({ tag, classes, onClick }) => {
  return (
    <div className={`tag ${classes}`} onClick={onClick}>
      <span>{tag}</span>
    </div>
  );
};

export default Tag;
