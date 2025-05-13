import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewModal = ({ countryName, closeModal, isLogged }) => {
  const [allReviews, setAllReviews] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all reviews and user's reviews for the country
  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        // Get all reviews for the country
        const allReviewsResponse = await axios.post('/api/view_reviews/', {
          country_name: countryName
        });

        // Get user's reviews for the country
        const myReviewsResponse = await axios.post('/api/view_self_reviews/', {
          country_name: countryName
        });

        setAllReviews(allReviewsResponse.data.reviews || []);
        setMyReviews(myReviewsResponse.data.reviews || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [countryName]);

  // Handle adding a new review
  const addReview = async () => {
    try {
      await axios.post('/api/add_review/', {
        country_name: countryName,
        review_text: reviewText
      });
      setReviewText(''); // Reset the review text
      fetchReviews();   // Refresh the reviews list after adding a new review
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={closeModal}>X</button>

        <h2>Reviews for {countryName}</h2>

        <div className="reviews-section">
          <h3>All Reviews</h3>
          {isLoading ? (
            <p>Loading reviews...</p>
          ) : (
            <div className="reviews-list">
              {allReviews.length > 0 ? (
                allReviews.map((review, index) => (
                  <div key={index} className="review">
                    <strong>{review.user_id.username}</strong> - 
                    <p>{review.review_text}</p>
                    <small>Reviewed on {new Date(review.created_at).toLocaleString()}</small>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          )}
        </div>

        <div className="reviews-section">
          <h3>My Reviews</h3>
          {isLoading ? (
            <p>Loading your reviews...</p>
          ) : (
            <div className="reviews-list">
              {myReviews.length > 0 ? (
                myReviews.map((review, index) => (
                  <div key={index} className="review">
                    <strong>{review.user_id.username}</strong> - 
                    <p>{review.review_text}</p>
                    <small>Reviewed on {new Date(review.created_at).toLocaleString()}</small>
                  </div>
                ))
              ) : (
                <p>You haven't reviewed this country yet.</p>
              )}
            </div>
          )}
        </div>

        {isLogged && (
          <div className="add-review-section">
            <textarea
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <button onClick={addReview}>Submit Review</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewModal;
