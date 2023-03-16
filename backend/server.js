// Express is the backend web framework
const express = require('express');
const dotenv = require("dotenv").config();
const {errorHandler} = require('./middleware/errorMiddleware');

// Initializing the application and port 
const app = express();
const port = process.env.PORT || 3000;

// Setting up the URL 
const connectDB = require('./config/db.js');

// Establish a connection to the database
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api/goals', require('./routes/movieRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(port, () => console.log(`Server Started on port ${port}`));