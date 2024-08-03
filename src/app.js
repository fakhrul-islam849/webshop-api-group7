const express = require('express');
const cors = require('cors');
const httpStatus = require('http-status');
const fileUpload = require('express-fileupload');
const routes = require('./route');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./helper/ApiError');
// eslint-disable-next-line import/order
const passport = require('passport');

process.env.PWD = process.cwd();

const app = express();

// enable cors

app.use(cors());
app.options('*', cors());
app.use(fileUpload({ useTempFiles: true }));
app.use(express.static(`${process.env.PWD}/public`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Function to serve all static files
// inside public directory.
app.use('/public', express.static('public'));

app.get('/', async (req, res) => {
    res.status(200).send('Congratulations! API is working!');
});
app.use('/api', routes);

// jwt authentication
app.use(passport.initialize());

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);
// require('pg').defaults.parseInt8 = true;
const db = require('./models');

db.sequelize.sync();
module.exports = app;
