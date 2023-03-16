const asyncHandler = require('express-async-handler');

// @desc retrieves the first num movies
// @route GET /api/movies/
// @access Private
const getAllMovies = asyncHandler(async (req, res) => {
    const movies = await req.movies.find().toArray();
    res.json(movies);
});
// @desc retrieves the first num movies
// @route GET /api/movies/num
// @access Private
const getNumMovies = asyncHandler(async (req, res) => {
    const num = parseInt(req.params.num);
    const limitedMovies = await req.movies.find().limit(num).toArray();
    res.json(limitedMovies);
});
// @desc retrieve movies that fall within the given years range
// @route GET /api/movies/year/min/max
// @access Private
const getMoviesBetweenYears = asyncHandler(async (req, res) => {
    const min = parseInt(req.params.min);
    const max = parseInt(req.params.max);
    const yearFilteredMovies = await req.movies.find({ year: { $gte: min, $lte: max } }).toArray();
    res.json(yearFilteredMovies);
});
// @desc retrieve movies that fall within the given years range
// @route GET /api/movies/ratings/min/max
// @access Private
const getMoviesBetweenRatings = asyncHandler(async (req, res) => {
    const min = parseFloat(req.params.min);
    const max = parseFloat(req.params.max);
    const ratingFilteredMovies = await req.movies.find({ rating: { $gte: min, $lte: max } }).toArray();
    res.json(ratingFilteredMovies);
});
// @desc retrieves movies that have a title that includes the given text
// @route GET /api/movies/title/text
// @access Private
const getMoviesByText = asyncHandler(async (req, res) => {
    const text = req.params.text.toLowerCase();
    const titleFilteredMovies = await req.movies.find({ title: { $regex: `.*${text}.*`, $options: 'i' } }).toArray();
    res.json(titleFilteredMovies);
});
// @desc retrieves the movie that has the given ID (not TMDB)
// @route GET /api/movies/id
// @access Private
const getMovieById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await req.movies.findOne({ id });
    res.json(movie);
});

/* Export all the controller functions */
module.exports = {
    getAllMovies,
    getNumMovies,
    getMoviesBetweenYears,
    getMoviesByText,
    getMoviesBetweenRatings,
    getMovieById,
}