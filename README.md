COMP4513 Assignment 2 - Movie explorer now with it's own backend API, built using MongoDB & Node.js/Express.

[👉 Access The Website Here 👈](https://movie-explorer-backend.onrender.com/users/login)

### Movie API Routes

1. [**GET**] https://movie-explorer-backend.onrender.com/api/movies *Returns all movies*.
2. [**GET**] https://movie-explorer-backend.onrender.com/api/movies/limit/:num *Returns first **num** movies*.
3. [**GET**] https://movie-explorer-backend.onrender.com/api/movies/:id *Returns the movie with the specified **id** field*.
4. [**GET**] https://movie-explorer-backend.onrender.com/api/movies/tmdb/:id *Returns the tmdb movie with the specified **id** field*.
5. [**GET**] https://movie-explorer-backend.onrender.com/api/movies/year/:min/:max *Returns all movies between the **min** and **max** year*.
6. [**GET**] https://movie-explorer-backend.onrender.com/api/movies/ratings/:min/:max *Returns all movies between the **min** and **max** ratings*.
7. [**GET**] https://movie-explorer-backend.onrender.com/api/movies/title/:text *Returns all movies that contain the given **text** in their title*.
8. [**GET**] https://movie-explorer-backend.onrender.com/api/movies/genre/:name *Returns all movies that have the given **genre** name*.


