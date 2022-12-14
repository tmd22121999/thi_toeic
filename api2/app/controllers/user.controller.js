
const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
  User.find(function(err, users){
    if(err){
        console.log(err);
    }
    else {
        res.status(200).json(users);
    }
});
  // res.status(200).send("JSON.stringify(User.find())");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
