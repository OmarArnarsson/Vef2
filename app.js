const express = require('express');
const path = require('path');
const lectures = require('./lectures.js');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

const hostname = '127.0.0.1';
const port = 3000;
app.use('/', lectures);

function notFoundHandler(req, res, next) { // eslint-disable-line
  res.status(404).send('Þessi síða er ekki til!');
}

function errorHandler(err, req, res, next) { // eslint-disable-line
  console.error(err);
  res.status(500).send('Villa!');
}

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, hostname, () => {
  console.info(`Server running at http://${hostname}:${port}/`);
});
