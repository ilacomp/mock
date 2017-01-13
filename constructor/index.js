var glob = require('glob'),
	path = require('path'),
	constructor = require('./constructor'),
	middlewares = [];

glob.sync(__dirname + '/../mocks/*.js*').forEach(function (file) {
	var middleware = require(path.resolve(file));
	console.log('Loaded middleware: ' + file);
	if (typeof middleware === 'object') {
		middleware = constructor(middleware);
	}
	middlewares.push(middleware);
});

module.exports = middlewares;
