
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


exports.CreateNewQuestion = (req, res) => {
  const {parentId,...rest}=req.body
  console.log(rest);
  const question = new Question({
    parentId:mongoose.Types.ObjectId(parentId),
    ...rest
  });
  question.save(function(err,resp) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(200).send({ message: "add data success!" ,question:resp});
  });
};


exports.UpdateQuestion = (req, res) => {
  mongoose.set('useFindAndModify', false);
  const {parentId,...rest}=req.body
  // console.log(req.params.Id);
  // Question.find({"_id":mongoose.Types.ObjectId(req.params.Id)},function(err, questions){
  //   if(err){
  //       console.log(err);
  //   }
  //   else {
  //     // res.status(200).json(exam);
  //     res.status(200).json({question:questions});
  //     return
  //   }
  // })
  Question.findOneAndUpdate({"_id":mongoose.Types.ObjectId(req.params.Id)}, 
  {
    parentId:mongoose.Types.ObjectId(parentId),
    ...rest
  }, 
  {upsert: true}, function(err, resp) {
  if (err) return res.status(500).send({error: err});
    return res.status(200).send({ 
      message: "Edit data success!" ,
      // question:resp
  });
  });
  // question.save(function(err,resp) {
  //   if (err) {
  //     res.status(500).send({ message: err });
  //     return;
  //   }

  // });
};


exports.DeleteQuestionById = (req, res) => {
  Question.deleteOne({ _id: mongoose.Types.ObjectId(req.params.ID) }, function (err) {
    if (err) return handleError(err);
    res.status(200).send({ message: "delete data success!" });
    // deleted at most one tank document
  });
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
