import React from "react";

const SearchBar = ({ title, placeholder, value, onChange }) => {
  return (
    <div className="container d-flex justify-content-between align-items-center my-2">
      <h3>{title}</h3>
      <input
        type="text"
        className="form-control search-input rounded-0 border-0 mb-2"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
