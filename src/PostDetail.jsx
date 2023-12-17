// PostDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PostDetail.css'; // Import the styles

const PostDetail = () => {
  const { id } = useParams();
  const [postDetails, setPostDetails] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        // Perform API request to Hacker News API for post details
        const response = await fetch(`http://hn.algolia.com/api/v1/items/${id}`);
        const data = await response.json();
        
        // Update postDetails state with the API response
        setPostDetails(data);
      } catch (error) {
        console.error('Error fetching post details:', error);
        // Handle error gracefully, e.g., display an error message to the user
      }
    };

    // Fetch post details only if an id is available
    if (id) {
      fetchPostDetails();
    }
  }, [id]);

  return (
    <div className="post-detail-container">
      {postDetails ? (
        <>
          <h2 className="post-title">{postDetails.title}</h2>
          <p className="post-points">Points: {postDetails.points}</p>
          <ul className="comment-list">
            {postDetails.children.map((comment) => (
              <li key={comment.id} className="comment-item">
                <p className="comment-text">{comment.text}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading post details...</p>
      )}
    </div>
  );
};

export default PostDetail;
