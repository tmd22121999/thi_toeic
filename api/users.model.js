const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let users = new Schema({
                _id: {
                    type: mongoose.ObjectId
                },
                uid: {
                    type: String
                },
                image: {
                    type: String
                },
                gender: {
                    type: String
                },
                phone: {
                    type: String
                },
                name: {
                    type: String
                },
                email: {
                    type: String
                },
                password: {
                    type: String
                },
                isVerify: {
                    type: Boolean
                }
            }, {
    collection: 'users'
});

module.exports = mongoose.model('users', users);