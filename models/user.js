// Authentication!

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});
UserSchema.plugin(passportLocalMongoose);
// ^ This adds onto our schema a username, a field for password, its going to make sure the usernames are unique, and some additional methods.
// From the docs:
// You're free to define your User how you like. 
// Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value.

module.exports = mongoose.model('User', UserSchema)