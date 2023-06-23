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

const getLoggedInUsersReviews = async (data) => {
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
};

const getReviewsByAlbum = async (data) => {
  const response = reviewAPI.get(`/${data.albumId}/album`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${data.accessToken}`
    },
    withCredentials: true
  });
  return response;
};

const getReviewsByArtist = async (data) => {
  const response = reviewAPI.get(`/${data.artistId}/artist`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${data.accessToken}`
    },
    withCredentials: true
  });
  return response;
};

const reviewServices = {
  createReview,
  getLoggedInUsersReviews,
  getReviewsByOtherUsers,
  getReviewsByAlbum,
  getReviewsByArtist
};

export default reviewServices;