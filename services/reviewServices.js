import Review from "../models/reviewModel.js";


const createReviewService = async (data) => {
  const movie = await Review.create(data);
  console.log(movie);
  return movie;
};

const getReviewService = async () => {
  const movies = await Review.find()
  return movies;
};


export { createReviewService, getReviewService };

