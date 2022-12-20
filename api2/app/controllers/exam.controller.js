
const db = require("../models");
const questionService  = require("../services/question.services");
const Question = db.question;
const Exam = db.exam;
const mongoose = require("mongoose");


exports.getAllExam = async (req, res) => {
  console.log([...AllExamQuery,
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.params.ID),
      }
    }]);
  Exam.aggregate(AllExamQuery).exec((err, exam) => {
    res.status(200).json(exam);
  })
};
exports.getExamById = (req, res) => {
    // console.log("err");
    Exam.findOne({
      _id: req.params.ID
    })
      .exec((err, exam) => {
        // console.log(questionController.getByPID());
        console.log(exam);
        pID = (exam._id);
        
        let examJson=[];
        
        questionService.getByPID(exam._id).then(data => {
          res.status(200).json({exam,...{question:data}});
          return
        })
        var response={};
        Question.find({"parentId":pID},function(err, questions){
        if(err){
            console.log(err);
        }
        else {
          // res.status(200).json(exam);
          // res.status(200).json({exam,...{question:questions}});
          return
        }
      })
        // res.status(200).json(exam);
      })
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



const AllExamQuery = [
  {
    $lookup: {
      from: "questions",
      // collection name in db
      localField: "_id",
      foreignField: "parentId",
      pipeline: [
        {
          $lookup: {
            from: "questions",
            // collection name in db
            localField: "_id",
            foreignField: "parentId",
            as: "childCard"
          }
        }
      ],
      as: "question"
    }
  }
]

const ExamUserQuery = [
  {
    $lookup: {
      from: "questions",
      // collection name in db
      localField: "_id",
      foreignField: "parentId",
      pipeline: [
        {
          $lookup: {
            from: "questions",
            // collection name in db
            localField: "_id",
            foreignField: "parentId",
            pipeline:[{
              $addFields:  {
                choices: { $concatArrays: ["$answer.texts","$answer.choices"] },
                answer: "$$REMOVE"
              }
            },
            ]
              ,
            as: "childCard"
          }
        },{
          $addFields:  {
            choices: { $concatArrays: ["$answer.texts","$answer.choices"] },
            answer: "$$REMOVE"
          }
        }],
      as: "question"
    }
  }
]