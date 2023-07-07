import Movie from "../models/moviesModel.js";


const createMovieService = async (data) => {
  const movie = await Movie.create(data);
  console.log(movie);
  return movie;
};

const getMovieService = async () => {
  const movies = await Movie.find()
  return movies;
};

const getSingleMovieService = async (movieId) => {
  console.log('movieId', movieId);
  const movies = await Movie.findById(movieId)
  return movies;
};


export { createMovieService, getMovieService, getSingleMovieService };

