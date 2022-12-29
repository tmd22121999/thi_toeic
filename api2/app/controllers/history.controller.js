
const db = require("../models");
const History = db.history;
const mongoose = require("mongoose");

exports.getAllHistory = (req, res) => {
    History.find(function(err, history){
    if(err){
        console.log(err);
    }
    else {
        console.log(history);
        res.status(200).json(history);
    }
});
  // res.status(200).send("JSON.stringify(User.find())");
};
exports.addHistory = (req, res) => {
    // console.log(req.body);
    const history = new History({
        userId: mongoose.Types.ObjectId(req.userId),
        examId: mongoose.Types.ObjectId(req.body.examId),
        answers: req.body.answers.map((item)=>{
            return({
            questionId: mongoose.Types.ObjectId(item.questionId),
            choice:item.choice}
            )
        })
    })
    history.save(function(err, history){
    if(err){
        console.log(err);
    }
    else {
        res.status(200).json(history);
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
