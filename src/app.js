const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
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

// jwt authentication
app.use(passport.initialize());
module.exports = app;
