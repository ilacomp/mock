var path = require('path'),
	mockServer = require('./constructor');

var config = {
	mocksDir: path.join(__dirname, 'mocks'),
	server: {
		httpPort: 3000,
		httpsPort: 0,
		privateKey: "sslcert/server.key",
		cert: "sslcert/server.crt"
	},
	proxies: [
		{
			uri: "/auth",
			host: "google.com"
		}
	],
	log: {
		logfile: "logfile.log",
		loglevel: "combined"
	}
};

//Start mock server
//mockServer.startServer(config);

//Or just add mocks to our existing app
var express = require('express'),
	app = express();
app.use(mockServer.mocks(config));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.send(err.message);
});

app.listen(3000, function () {
	console.log('Mock app listening on port 3000');
});
