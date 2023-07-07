import Movie from "../models/moviesModel.js";

const getMovieService = async () => {
  const movies = await Movie.find()
  return movies;
};

const createMovieService = async (data) => {
  const movie = await Movie.create(data);
  console.log(movie);
  return movie;
};


export { createMovieService, getMovieService };

