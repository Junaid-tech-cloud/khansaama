const {ObjectID} = require('mongodb');
const mongoose = require('mongoose');
const passport = require('passport');

mongoose.Promise = global.Promise;

const mongoURI = process.env.MONGODB_URI;
const secret = 'foodies'
mongoose.connect(mongoURI || 'mongodb://localhost:27017/foodaround', {
    useMongoClient: true
});

module.exports = {mongoose, ObjectID, secret}