const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    //unique doesn't add a validator, allows mongoose to add some internal optimizations for performance
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

userSchema.plugin(uniqueValidator);

//this model will be the bridge between our express app to the mongodb database
module.exports = mongoose.model('User', userSchema);
