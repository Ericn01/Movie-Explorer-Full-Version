const asyncHandler = require('express-async-handler');
const Movie = require('../models/movieModel')
// @desc retrieves the first num movies
// @route GET /api/movies/
// @access Private
const getAllMovies = asyncHandler(async (req, res) => {
    const movies = await Movie.find({}).sort({title: 1});
    res.status(200).json(movies);
});
// @desc retrieves the first num movies
// @route GET /api/movies/num
// @access Private
const getNumMovies = asyncHandler(async (req, res) => {
    // Find the movie limit
    const movieLimit = parseInt(req.params.num);
    // Retrieve the sorting stuff
    const { attribute, order } = getSortingDetails();
    console.log(attribute, order);
    // Return the matching movies within the specified limit
    const limitedMovies = await Movie.find({[attribute]: order}).limit(movieLimit);
    res.status(200).json(limitedMovies);
});
// @desc retrieve movies that fall within the given years range
// @route GET /api/movies/year/min/max
// @access Private
const getMoviesBetweenYears = asyncHandler(async (req, res) => {
    const minYear = req.params.min; 
    const maxYear = req.params.max;
    minIsGreaterThanMaxCheck(minYear, maxYear, res, "year");
    const yearFilteredMovies = await Movie.find({release_date: { $gt: minYear, $lt: maxYear }}).sort({title: 1});
    noMatchesFoundCheck(yearFilteredMovies, res);
    res.status(200).json(yearFilteredMovies);
});
// @desc retrieve movies that fall within the given years range
// @route GET /api/movies/ratings/min/max
// @access Private
const getMoviesBetweenRatings = asyncHandler(async (req, res) => {
    const min = Number(req.params.min);
    const max = Number(req.params.max);
    minIsGreaterThanMaxCheck(min, max, res, "rating");
    const ratingFilteredMovies = await Movie.find({'ratings.average': { $gt: min, $lt: max } }).sort({title: 1});
    noMatchesFoundCheck(ratingFilteredMovies);
    res.status(200).json(ratingFilteredMovies);
});
// @desc retrieves movies that have a title that includes the given text
// @route GET /api/movies/title/text
// @access Private
const getMoviesByText = asyncHandler(async (req, res) => {
    const text = req.params.text.toLowerCase();
    const titleFilteredMovies = await Movie.find({title: { $regex: `.*${text}.*`, $options: 'i' } });
    noMatchesFoundCheck(titleFilteredMovies, res);
    res.status(200).json(titleFilteredMovies);
});
// @desc retrieves movies that have a title that includes the given text
// @route GET /api/movies/genre/name
// @access Private
const getMoviesByGenre = asyncHandler(async (req, res) => {
    const genreName = req.params.name;
    // For this DB query, we need to access movieObj[details][genres][name].
    const genreFilteredMovies = await Movie.find({'details.genres.name': genreName});
    noMatchesFoundCheck(genreFilteredMovies, res);
    res.status(200).json(genreFilteredMovies);
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
// @desc retrieves the movie that has the given ID (not TMDB)
// @route GET /api/movies/ratingsLess/:max
// @access Private
const getMoviesBelowRating = asyncHandler(async (req, res) => {
    const max = Number(req.params.max);
    invalidValueCheck(max, res); // Checks for NaN or a rating <0
    const matches = await Movie.find({'ratings.average': {$lt: max}}).sort({title: 1});
    noMatchesFoundCheck(matches);
    res.status(200).json(matches);
});

// @desc retrieves the movie(s) that have an average rating less than the given value (minimum)
// @route GET /api/movies/ratingsGreater/:min
// @access Private
const getMoviesAboveRating = asyncHandler(async (req, res) => {
    const min = Number(req.params.min);
    invalidValueCheck(min, res); // Checks for NaN or a rating <0
    const matches = await Movie.find({'ratings.average': {$gt: min}}).sort({title: 1});
    noMatchesFoundCheck(matches);
    res.status(200).json(matches);
});

// @desc retrieves the movie(s) that were released before the given date.
// @route GET /api/movies/yearLess/:max
// @access Private
const getMoviesBelowYear = asyncHandler(async (req, res) => {
    const maxYear = req.params.max; // Maximum date/year
    const matches = await Movie.find({release_date: {$lt: maxYear}}).sort({title: 1});
    noMatchesFoundCheck(matches);
    res.status(200).json(matches);
});

// @desc retrieves the movie(s) that were release after the given date.
// @route GET /api/movies/yearGreater/:min
// @access Private
const getMoviesAboveYear = asyncHandler(async (req, res) => {
    const minYear = req.params.min; // Minimum date/year
    const matches = await Movie.find({release_date: {$gt: minYear}}).sort({title: 1});
    noMatchesFoundCheck(matches);
    res.status(200).json(matches);
});

// Checks to see if the minimum value entered is greater than max. 
// If so, a 400 status code is sent (Bad Request) as min cannot be greater than max.
const minIsGreaterThanMaxCheck = (min, max, res, attribute) => {
    if (min > max){
        res.status(400)
        throw new Error(`The minimum ${attribute} must be less than or equal to the maximum!`);
    }
}
// Checks to see if any matches are returned from the query
const noMatchesFoundCheck = (results, res) => {
    if (!results || results.length === 0){
        res.status(404)
        throw new Error("No matches were found with the given criteria...");
    }
}
// Checks to see if the given value is either less than 0 or NaN
const invalidValueCheck = (value, res) => {
    if (value < 0 || isNaN(value)){
        res.status(400);
        throw new Error(`The value you inputted: ${value} is invalid. Please only enter positive values...`);
    }
}
// Returns the sorting details from a client request
const getSortingDetails = (req) => {
    const sortAttribute= req.query.attribute || 'title';
    const sortOrder = req.query.order === 'asc' ? 1 : -1;
    return {attribute: sortAttribute, order: sortOrder};
}
/* Export all the controller functions */
module.exports = {
    getAllMovies,
    getNumMovies,
    getMoviesBetweenYears,
    getMoviesByText,
    getMoviesBetweenRatings,
    getMovieById,
    getMoviesByGenre,
    getMoviesAboveRating,
    getMoviesBelowRating,
    getMoviesAboveYear,
    getMoviesBelowYear
}