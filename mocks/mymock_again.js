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
