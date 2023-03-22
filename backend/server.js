// Express is the backend web framework
const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv").config();
// Initializing the application and port 
const app = express();
const port = process.env.PORT || 5000;
// Setting up the URL 
const connectDB = require('./config/db.js');

// Establish a connection to the database
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api/movies', require('./routes/movieRoutes'));
app.use('/api/users', require('./routes/userRoutes'));


app.listen(port, () => console.log(`Server Started on port ${port}`));