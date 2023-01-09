
const db = require("../models");
const questionService  = require("../services/question.services");
const Question = db.question;
const Exam = db.exam;
const mongoose = require("mongoose");


exports.getAllExam = async (req, res) => {
  // console.log([...AllExamQuery,
  //   {
  //     $match: {
  //       _id: mongoose.Types.ObjectId(req.params.ID),
  //     }
  //   }]);
  Exam.aggregate(AllExamQuery).exec((err, exam) => {
    res.status(200).json(exam);
  })
};
exports.getExamById = (req, res) => {
    GetByIdQuery = [...AllExamQuery,
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.params.ID),
      }
    }];
  Exam.aggregate(GetByIdQuery).exec((err, exam) => {
    if(err){
      return res.status(500).json({error:err});
    }
    res.status(200).json(exam);
  })
};

exports.CreateNewExam = (req, res) => {
  console.log(req.body);
  const exam = new Exam({...req.body});
  exam.save(function(err,resp) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(200).send({ message: "add data success!" ,exam:resp});
  });
};
exports.EditExam = (req, res) => {
  const exam = new Exam();

  Exam.findOneAndUpdate({"_id":mongoose.Types.ObjectId(req.params.Id)}, 
  {...req.body}, 
  {upsert: true}, function(err, resp) {
  if (err) return res.status(500).send({error: err});
    return res.status(200).send({ 
      message: "Edit data success!" ,
      // question:resp
  });
  });

  // exam.save(function(err,resp) {
  //   if (err) {
  //     res.status(500).send({ message: err });
  //     return;
  //   }

  //   res.status(200).send({ message: "add data success!" ,exam:resp});
  // });
};


exports.DeleteExamById = (req, res) => {
  Exam.deleteOne({ _id: mongoose.Types.ObjectId(req.params.ID) }, function (err) {
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