var config = require('./config'),
	express = require('express'),
	bodyParser = require('body-parser'),
	httpProxy = require('express-http-proxy'),
	mocks = require('./constructor'),
	logger = require('morgan'),
	fs = require('fs'),
	http = require('http'),
	https = require('https'),
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

var httpServer = http.createServer(app);
httpServer.listen(config['http-port'], function () {
	console.log('Mock app listening on port', config['http-port']);
});

if (!config['https-port']) return;

var privateKey  = fs.readFileSync(config['private-key'], 'utf8');
var certificate = fs.readFileSync(config['cert'], 'utf8');
var credentials = {key: privateKey, cert: certificate};
var httpsServer = https.createServer(credentials, app);

httpsServer.listen(config['https-port'], function () {
	console.log('Mock app listening on port', config['https-port']);
});
