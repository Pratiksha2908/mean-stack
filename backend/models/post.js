const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

//The 1st arguement inside model parentheses (it can be any variable) should be always uppercase.
module.exports = mongoose.model('Post', postSchema);


