const mongoose = require("mongoose");

const genresSchema = mongoose.Schema(
    {
        id: Number,
        name: String
    }
)
const ratingSchema = mongoose.Schema({
    popularity: Number,
    average: Number,
    count: Number
})

const detailsSchema = mongoose.Schema({
    overview: String, 
    genres: [genresSchema]
})

const movieSchema = mongoose.Schema({
    id: Number,
    tmdb_id: Number,
    imdb_id: String,
    release_date: String,
    runtime: Number,
    revenue: Number,
    tagline: String,
    poster: String,
    backdrop: String,
    ratings: ratingSchema,
    details: detailsSchema,
});

module.exports = mongoose.model("Movie", movieSchema, 'movie-data');