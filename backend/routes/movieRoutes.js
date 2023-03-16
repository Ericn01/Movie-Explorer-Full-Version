const express = require('express');
const { getAllMovies, getMovieById, getMoviesBetweenRatings, getMoviesByText, getNumMovies, getMoviesBetweenYears } = require('../controllers/movieController');

const app = express();

// Route to get all movies
app.get('/api/movies', getAllMovies);

// Route to get the first num movies
app.get('/api/movies/limit/:num', getNumMovies);

// Route to get a single movie by id
app.get('/api/movies/:id', getMovieById);

// Route to get all movies between min and max year
app.get('/api/movies/year/:min/:max', getMoviesBetweenYears);

// Route to get all movies between min and max rating
app.get('/api/movies/ratings/:min/:max', getMoviesBetweenRatings);

// Route to get all movies with title containing text
app.get('/api/movies/title/:text', getMoviesByText);