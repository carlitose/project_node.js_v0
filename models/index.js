const mongoose = require('mongoose');
const db = 'mongodb://localhost/test';
const logger = require('winston');

mongoose.Promise = global.Promise;

// Create the database connection
mongoose.connect(db, {useMongoClient:true});
// If the connection throws an error
mongoose.connection.on('error', function (err) {
    logger.info('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    logger.info('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        logger.error('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

module.exports ={
	User : require('./users')
}