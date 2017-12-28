var mongoose = require('mongoose');

var PostSchema = mongoose.Schema({
    title: String,
    text: String,
    date: Date.now()
});


