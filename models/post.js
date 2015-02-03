var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	title: String,
	content: {type: String, default: ""}, 
	timestamp: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Post', PostSchema);