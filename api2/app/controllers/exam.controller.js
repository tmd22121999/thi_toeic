
const db = require("../models");
const Exam = db.exam;

exports.getAllExam = (req, res) => {
    // console.log("err");
    Exam.find(function(err, exams){
    if(err){
        console.log(err);
        res.status(500).json({messenger:"error"});
        return;
    }
    
    console.log(exams);
    res.status(200).json(exams);
    
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
