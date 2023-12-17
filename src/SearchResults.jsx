// SearchResults.js
import React from 'react';
import { Link } from 'react-router-dom';
import './SearchResults.css'; // Import the styles

const SearchResults = ({ results, onSelectPost }) => {
  return (
    <ul className="search-results">
      {results.map((post) => (
        <li key={post.objectID} className="search-result-item">
          {/* Wrap the result item with Link */}
          <Link to={`/post/${post.objectID}`} className="result-link" onClick={() => onSelectPost(post)}>
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
