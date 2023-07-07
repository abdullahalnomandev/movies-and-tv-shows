import { createReviewService, getReviewService } from "../services/reviewServices.js";
import AppError from "../utils/appError.js";

const getAllReviews = async (req, res, next) => {
  try {

    const Reviews = await getReviewService();;
    res.status(200).json({
      status: "success",
      result: movies.length,
      data: Reviews
    });
  } catch (error) {
    next(new AppError(error, 404));
  }
};

const createReviews = async (req, res, next) => {
  try {
    const product = await createReviewService(req.body);
    res.status(200).json({
      status: "success",
      data: product
    });
  } catch (error) {
    next(new AppError(error, 404));
  }
};





export { createReviews, getAllReviews };

