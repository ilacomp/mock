# Simple mock server
This is a web server, designed for easy creation of http responses.

##Install
Clone repository
```bash
$ git clone https://github.com/ilacomp/mock.git
$ cd mock
```
Install dependencies
```bash
npm install
```

##Start
```bash
npm start
```

##Configuration

Edit config.json 
```js
"port": 3000,
"proxies": [
    {
        "uri": "/uriToProxy",
        "host": "targetServer.com"
    }
]
```
##Creating mocks
###Simple mock
Create json file in mocks folder
```js
"method": "post",
"uri": "/a/b",
"status": 403,
"response": {
"answer": "ok"
},
"headers": [
{
  "name": "Myheader",
  "value": "Myvalue"
},
{
  "name": "Anything-else",
  "value": "More values"
}
],
"cookies": [
{
  "name": "mycookie",
  "value": "something"
}
]
```
###Advanced mock
You can create your own mock function using NodeJS and express framework.

Mock function is a Express middleware, which will receive params:

`req` - object with request information

`res` - object with response

`next` - function, which must be called if you wish to pass request to other middlewares.

Just put your module to mocks directory.

Example module:

```js
var express = require('express');
var router = express.Router();

router.route('/mock/:id1')
	.get(function(req, res, next){
		res.json({answer: 'not ok'});
	})
	.post(function(req, res, next){
		console.log('This is PUT middleware too:', req.url);
		next();
	});

module.exports = router;
```