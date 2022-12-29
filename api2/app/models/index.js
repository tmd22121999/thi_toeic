const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.question = require("./question.model");
db.history = require("./history.model");
db.exam = require("./exam.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;