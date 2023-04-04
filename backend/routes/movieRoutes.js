const express = require('express');
const router = express.Router();
const { getAllMovies, getMovieById, getMoviesBetweenRatings, getMoviesByText, getNumMovies, getMoviesBetweenYears, getMoviesByGenre, 
        getMoviesAboveRating, getMoviesBelowRating, getMoviesAboveYear, getMoviesBelowYear} = require('../controllers/movieController');

// Route to get all movies
router.get('/', getAllMovies);

// Route to get the first num movies
router.get('/limit/:num', getNumMovies);

// Route to get a single movie by id
router.get('/:id', getMovieById);

// Same can be done for the IMBD route 
router.get('/tmdb/:id', getMovieById);

// Route to get all movies between min and max year
router.get('/year/:min/:max', getMoviesBetweenYears);

// Route to get all movies between min and max rating
router.get('/ratings/:min/:max', getMoviesBetweenRatings);

// Route to get all movies with title containing text
router.get('/title/:text', getMoviesByText);

// Route to get all movies with the specified genre name
router.get('/genre/:name', getMoviesByGenre);

/* OTHER ROUTES (Not specified by assignment spec) */

// Route to get all movies below a certain rating 
router.get('/ratingsLess/:max', getMoviesBelowRating);
// Route to get all movies above a certain rating
router.get('/ratingsGreater/:min', getMoviesAboveRating);
// Same is done with minimum and maximum values for year
router.get('/yearLess/:max', getMoviesBelowYear);
// Retrieve movies released before the given year.
router.get('/yearGreater/:min', getMoviesAboveYear);

// Export router
module.exports = router;