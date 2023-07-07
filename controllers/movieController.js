import { createMovieService, getMovieService } from "../services/movieServices.js";
import AppError from "../utils/appError.js";

const getAllMovies = async (req, res, next) => {
  try {

    const movies = await getMovieService();;
    res.status(200).json({
      status: "success",
      result: movies.length,
      data: movies
    });
  } catch (error) {
    next(new AppError(error, 404));
  }
};

const createMovies = async (req, res, next) => {
  try {
    const product = await createMovieService(req.body);
    res.status(200).json({
      status: "success",
      data: product
    });
  } catch (error) {
    next(new AppError(error, 404));
  }
};


export { createMovies, getAllMovies };

