const express = require('express');
const app = express();
const body_parser = require('body-parser');
const morgan = require('morgan'); // http request logger middleware
const helmet = require('helmet');
const compression = require('compression'); // compression middleware
const routes = require('./routes');
/*eslint-disable  no-unused-vars*/
const db = require('./models');
const scheduler = require('./scheduler');

app.set('trust proxy', 'loopback');
app.use(helmet()); //default modules only
app.use(helmet.noCache()); // module for disabling client-side caching
app.use(morgan('dev'));

// Configure Express
app.use(compression({
	threshold: 1024
}));
app.use(body_parser.urlencoded({
	extended: true
}));
app.use(body_parser.json({
	limit: '5mb'
}));

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-Requested-With, Content-Type, User-Agent');
	res.header('Access-Control-Allow-Methods', 'GET, POST');
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
});
app.options('*', function (req, res) {
	res.status(204).end();
});

app.use(routes);

app.listen(3000, function () { 
	console.log('Server active on port 3000!');
});

/* ERROR */
process.on('uncaughtException', (error) => {
  console.log('suca');
  console.error(`uncaughtException in process : ${process.pid}`, error);
});

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection in proccess', 'at: Promise', p, 'reason:', reason);
})

module.exports = app;
