const config = require('config');
const mongoose = require('mongoose');

mongoose.connection.on('connecting', () => {
	console.log('[Mongoose] Trying to establish a connection to MongoDB.');
});

mongoose.connection.on('connected', () => {
	console.log('[Mongoose] Connection established successfully.');
});

mongoose.connection.on('disconnected', () => {
	console.log('[Mongoose] Disconnected from MongoDB.');
});

mongoose.connect(config.get('db'), {useNewUrlParser: true, useUnifiedTopology: true, keepAlive: true});

module.exports = mongoose;

require('@models/load_all');
