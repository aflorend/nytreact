// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// Article Schema
const Article = require('./models/Article');

// Express instance
const app = express();

const PORT = process.env.PORT || 3000;

// Use Morgan for logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+vjson' }));

// Public is a static directory
app.use(express.static('./public'));

// ---------------------------------------------------------------
// MongoDB config
mongoose.connect('mongodb://localhost:27017/nytreact');
const db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose error: ', err);
});

db.once('open', function() {
  console.log('Mongoose connection successful');
});

// ---------------------------------------------------------------
// Routes
