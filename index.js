var config = require('./config'),
	express = require('express'),
	bodyParser = require('body-parser'),
	httpProxy = require('express-http-proxy'),
	mocks = require('./constructor'),
	logger = require('morgan'),
	app = express();

//Log requests
app.use(logger('dev'));

//CORS
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

//Parse body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Add mocks
app.use(mocks);

//Use proxy
if (config.proxies) {
	config.proxies.forEach(function(proxy){
		app.use(proxy.uri, httpProxy(proxy.host));
	});
}

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

app.listen(config.port, function () {
	console.log('Mock app listening on port', config.port);
});