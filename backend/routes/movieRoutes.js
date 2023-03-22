const express = require('express');
const router = express.Router();
const { getAllMovies, getMovieById, getMoviesBetweenRatings, getMoviesByText, getNumMovies, getMoviesBetweenYears, getMoviesByGenre } = require('../controllers/movieController');

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
router.get('/genre/name', getMoviesByGenre);

module.exports = router;