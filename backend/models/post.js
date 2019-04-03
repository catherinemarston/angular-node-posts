const mongoose = require('mongoose');

//this is just a blueprint, not the model we work with in our code
const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    imagePath: {type: String, required: true}
});
//this model will be the bridge between our express app to the mongodb database
module.exports = mongoose.model('Post', postSchema);
