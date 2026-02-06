import React from "react";
import { Search } from "lucide-react";

// SearchBar Component
const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-wrapper">
      <input
        type="text"
        placeholder="Search"
        className="search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Search className="search-icon" size={18} />
    </div>
  );
};

export default SearchBar;
