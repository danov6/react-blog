const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const expressJwt = require('express-jwt');
const secret = "SUPER-SECRET-MF-PASSWORD";

mongoose.promise = global.Promise;

const isProduction = true;

const app = express();

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users/profile', expressJwt({
  secret: secret
}));

mongoose.connect('mongodb+srv://glvaldez:Giordano1!@cluster0-axmms.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Add models
require('./models/Article');
require('./models/User');
require('./models/Comment');

// Add routes
app.use(require('./routes'));

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

const server = app.listen(8000, () => console.log('Server started on http://localhost:8000'));