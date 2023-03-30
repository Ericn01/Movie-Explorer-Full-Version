// Express is the backend web framework
const express    = require('express');
const cors       = require('cors');
const dotenv     = require("dotenv").config();
const passport   = require('passport');
const flash      = require('express-flash');
const session    = require('express-session');
const bodyParser = require('body-parser');
const { initUserPassport } = require("./passport-config");



// Initializing the application and port 
const app = express();
const port = process.env.PORT || 7000;
// Setting up the URL 
const connectDB = require('./config/db.js');

// Establish a connection to the database
connectDB();

// Enabling the app to use EJS as a view engine
app.set('view engine', 'ejs');
app.set('views', 'backend/views');
// Middleware
app.use(cors()); // Since frontend and backend won't be hosted on the same server, CORS will be enabled
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Parses form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/movies', require('./routes/movieRoutes'));
app.use('/users', require('./routes/usersRoutes'));

app.listen(port, () => console.log(`Server Started on port ${port}`));

// User passport authentication
initUserPassport(passport, 
    email => users.find(user => user.email === email),
    id => users.find(id => user.id === id)
);