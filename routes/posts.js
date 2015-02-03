var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = require('../models/post.js');

/* GET post listing. */
router.get('/', function (req, res, next) {
  Post.find({}).sort({timestamp: 'desc'}).exec(function (err,  posts) {
  	if (err) return next(err);
  	res.json(posts);
  });
});

/* POST to /posts */
router.post('/', function (req, res, next) {
	Post.create(req.body, function (err, post) {
		console.log(req.body);
		if (err) return next(err);
		res.json(post);
	});
});

/* GET post by id */
router.get('/:id', function (req, res, next) {
	Post.findById(req.params.id, function (err, post) {
		if (err) return next(err);
		res.json(post);
	})
})

/* PUT update by id */
router.put('/:id', function (req, res, next) {
	Post.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

/* DELETE by id */
router.delete('/:id', function (req, res, next) {
	Post.findByIdAndRemove(req.params.id, req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
	// clear all if necessary
	// Post.find({}).exec(function (err, posts) {
	// 	if (err) return next(err);
	// 	posts.forEach(function (post) {
	// 		post.remove();
	// 	});
	// });
});

module.exports = router;
