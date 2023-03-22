const asyncHandler = require('express-async-handler');
const Movie = require('../models/movieModel')
// @desc retrieves the first num movies
// @route GET /api/movies/
// @access Private
const getAllMovies = asyncHandler(async (req, res) => {
    const movies = await Movie.find().sort({title: 1});
    res.status(200).json(movies);
});
// @desc retrieves the first num movies
// @route GET /api/movies/num
// @access Private
const getNumMovies = asyncHandler(async (req, res) => {
    // Find the movie limit
    const movieLimit = parseInt(req.params.num);
    // Return the matching movies within the specified limit
    const limitedMovies = await Movie.find().limit(movieLimit);
    res.status(200).json(limitedMovies);
});
// @desc retrieve movies that fall within the given years range
// @route GET /api/movies/year/min/max
// @access Private
const getMoviesBetweenYears = asyncHandler(async (req, res) => {
    const min = parseInt(req.params.min);
    const max = parseInt(req.params.max);
    minIsGreaterThanMaxCheck(min, max, req, "year");
    const yearFilteredMovies = await Movie.find({ year: { $gte: min, $lte: max } }).sort({title: 1});
    res.status(200).json(yearFilteredMovies);
});
// @desc retrieve movies that fall within the given years range
// @route GET /api/movies/ratings/min/max
// @access Private
const getMoviesBetweenRatings = asyncHandler(async (req, res) => {
    const min = parseFloat(req.params.min);
    const max = parseFloat(req.params.max);
    minIsGreaterThanMaxCheck(min, max, req, "rating");
    const ratingFilteredMovies = await Movie.find({ rating: { $gte: min, $lte: max } }).sort({title: 1});
    res.status(200).json(ratingFilteredMovies);
});
// @desc retrieves movies that have a title that includes the given text
// @route GET /api/movies/title/text
// @access Private
const getMoviesByText = asyncHandler(async (req, res) => {
    const text = req.params.text.toLowerCase();
    const titleFilteredMovies = await Movie.find({ title: { $regex: `.*${text}.*`, $options: 'i' } });
    noMatchesFoundCheck(titleFilteredMovies, res);
    res.status(200).json(titleFilteredMovies);
});
// @desc retrieves movies that have a title that includes the given text
// @route GET /api/movies/title/text
// @access Private
const getMoviesByGenre = asyncHandler(async (req, res) => {
    const genreName = req.params.name.toLowerCase().trim();
    const genreFilteredMovies = await Movie.find({ name: genreName });
    noMatchesFoundCheck(titleFilteredMovies, res);
    res.status(200).json(titleFilteredMovies);
})
// @desc retrieves the movie that has the given ID (not TMDB)
// @route GET /api/movies/id
// @access Private
const getMovieById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await Movie.findOne({id: id});
    noMatchesFoundCheck(movie, res);
    res.status(200).json(movie);
});
// Checks to see if the minimum value entered is greater than max. 
// If so, a 400 status code is sent (Bad Request) as min cannot be greater than max.
const minIsGreaterThanMaxCheck = (min, max, res, attribute) => {
    if (min > max){
        return res.status(400).json({error: `The minimum ${attribute} must be less than or greater than the maximum!`});
    }
}
const noMatchesFoundCheck = (results, res) => {
    if (!results || results.length === 0){
        return res.status(404).json({error: `No matches were found with the given criteria...`});
    }
}
/* Export all the controller functions */
module.exports = {
    getAllMovies,
    getNumMovies,
    getMoviesBetweenYears,
    getMoviesByText,
    getMoviesBetweenRatings,
    getMovieById,
    getMoviesByGenre
}