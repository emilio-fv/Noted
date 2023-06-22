import reviewAPI from '../../api/reviewApi';

const createReview = async (data) => {
  const response = reviewAPI.post('/create', data.reviewData, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${data.accessToken}`
    },
    withCredentials: true
  });
  return response.data;
};

const getLoggedInUsersReview = async (data) => {
  const response = reviewAPI.get('/loggedInUser', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${data.accessToken}`
    },
    withCredentials: true
  });
  return response;
};

const getReviewsByOtherUsers = async (data) => {
  const response = reviewAPI.get('/allOthers', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${data.accessToken}`
    },
    withCredentials: true
  });
  return response;
}

const reviewServices = {
  createReview,
  getLoggedInUsersReview,
  getReviewsByOtherUsers
};

export default reviewServices;