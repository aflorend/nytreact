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



// Get route to display saved articles
app.get('/api', function(req, res) {

// Using Monogoose to find saved articles, limited to 10, descending by date saved
  Article.find({}).sort([
    ['date', 'descending']
  ]).limit(10).exec(function(err, doc) {
    if (err) {
      console.log(err)
    }
    else {
      res.send(doc);
    }
  });
});

// Post route to save articles
app.post('/api', function(req, res) {
// Creating entry in our DB
  Article.create({
    headline: req.body.headline,
    url: req.body.url,
    date: Date.now()
  }), function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.send('Saved article')
    }
  }
});

// Delete route using article id
app.delete('/api', function(req, res) {
  console.log(req.body);
  console.log('delete request made');
  // Article.remove({
  //   '_id': req.body._id
  // }), function(err) {
  //   if (err) {
  //     console.log(err);
  //   }
  //   else {
  //     res.send('Aricle Deleted')
  //   }
  // }
});

// Main '/' Route to direct user to rendered React application
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// ---------------------------------------------------------------
// Listener
app.listen(PORT, function() {
  console.log('App listening on PORT: ' + PORT)
})
