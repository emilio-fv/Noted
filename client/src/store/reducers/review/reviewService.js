import reviewAPI from '../../api/reviewApi';

const createReview = async (data) => {
  const response = reviewAPI.post('/create', data, { withCredentials: true });
  return response.data;
};

const reviewServices = {
  createReview,
};

export default reviewServices;