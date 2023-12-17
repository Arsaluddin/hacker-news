// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import PostDetail from './PostDetail';
import './App.css'; // Import the global styles

const App = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleSearch = async (newQuery) => {
    setQuery(newQuery);

    try {
      // Perform API request to Hacker News API
      const response = await fetch(`http://hn.algolia.com/api/v1/search?query=${newQuery}`);
      const data = await response.json();

      // Update searchResults state with the API response
      setSearchResults(data.hits);
    } catch (error) {
      console.error('Error fetching search results:', error);
      // Handle error gracefully, e.g., display an error message to the user
    }
  };

  const handleSelectPost = (post) => {
    setSelectedPost(post);
  };

  useEffect(() => {
    if (selectedPost) {
      // Scroll to the top when a post is selected
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedPost]);

  return (
    <Router>
      <div className="container">
        <div className="header">
          <h1>Hacker News Search</h1>
        </div>

        <Routes>
          <Route
            exact
            path="/"
            element={(
              <div>
                <SearchBar onSearch={handleSearch} />
                <SearchResults results={searchResults} onSelectPost={handleSelectPost} />
              </div>
            )}
          />
          <Route path="/post/:id" element={<PostDetail post={selectedPost} />} />
        </Routes>

        <div className="footer">
          <p>&copy; 2023 Hacker News Search</p>
        </div>
      </div>
    </Router>
  );
};

export default App;
