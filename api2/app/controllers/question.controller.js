
const db = require("../models");
const Question = db.question;
const mongoose = require("mongoose");

exports.getAllQuestion = (req, res) => {
    Question.find(function(err, question){
    if(err){
        console.log(err);
    }
    else {
        console.log(question);
        res.status(200).json(question);
    }
});
  // res.status(200).send("JSON.stringify(User.find())");
};
exports.getByPID = (req, res) => {
    console.log(req.params.parentID);
    let pID=req.params.parentID;
    pID = mongoose.Types.ObjectId(pID);
    console.log(pID);
    Question.find({"parentId":pID},function(err, questions){
    if(err){
        console.log(err);
    }
    else {
        res.status(200).json(questions);
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
