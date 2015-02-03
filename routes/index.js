var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = require('../models/post.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Nodeboard' });
});

/* GET single post */
router.get('/post/:id', function(req, res, next) {
	Post.findById(req.params.id, function (err, post) {
		if (err) return next(err);
		res.render('single', { title: 'Nodeboard' });
		// res.render('single', { title: 'Post ' + req.params.id, id:req.params.id });
	})
});

module.exports = router;
