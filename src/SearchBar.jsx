// SearchBar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css'; // Import the styles

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const history = useNavigate();

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim() !== '') {
      // Trigger the search and navigate to the home screen
      onSearch(query);
      history('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Trigger the search and navigate to the home screen
      onSearch(query);
      history('/');
    }
  };

  return (
    <div className="search-bar-container">
      <input
        className="search-input"
        type="text"
        value={query}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder="Search Hacker News"
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
