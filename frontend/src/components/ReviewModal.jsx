import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ALL_REVIEWS_ENDPOINT_URL, MY_REVIEWS_ENDPOINT_URL, ADD_REVIEW_ENDPOINT_URL } from '../utils/ApiHost';

const ReviewModal = ({ reviewsOpened, setReviewsOpened, isLogged }) => {
  const [allReviews, setAllReviews] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'my'
  const [showAddReviewForm, setShowAddReviewForm] = useState(false);
  const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const allReviewsResponse = await axios.post(ALL_REVIEWS_ENDPOINT_URL, {
          country_name: reviewsOpened,
        }, {withCredentials: true});
  
        const myReviewsResponse = await axios.post(MY_REVIEWS_ENDPOINT_URL, {
          country_name: reviewsOpened,
        },   {withCredentials: true});

        setAllReviews(allReviewsResponse.data.reviews || []);
        setMyReviews(myReviewsResponse.data.reviews || []);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };
  useEffect(() => {
    

    fetchReviews();
  }, [reviewsOpened, showAddReviewForm]);

  const addReview = async () => {
    try {
      await axios.post(ADD_REVIEW_ENDPOINT_URL, {
        country_name: reviewsOpened,
        review_text: reviewText,
      }, {withCredentials: true});
      setReviewText('');
      setShowAddReviewForm(false);
      fetchReviews();
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const closeModal = () => {
    setReviewsOpened('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={closeModal}>
          X
        </button>

        <h2>Reviews for {reviewsOpened}</h2>

        <div className="tabs">
          <button
            className={activeTab === 'all' ? 'active' : ''}
            onClick={() => setActiveTab('all')}
          >
            All Reviews
          </button>
          <button
            className={activeTab === 'my' ? 'active' : ''}
            onClick={() => setActiveTab('my')}
          >
            My Reviews
          </button>
        </div>

        {activeTab === 'all' && (
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
        )}

        {activeTab === 'my' && (
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
        )}

        {isLogged && (
          <div className="add-review-toggle">
            <button onClick={() => setShowAddReviewForm(!showAddReviewForm)}>
              {showAddReviewForm ? 'Cancel' : 'Add Review'}
            </button>
          </div>
        )}

        {showAddReviewForm && (
          <div className="add-review-form">
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