
const db = require("../models");
const questionService  = require("../services/question.services");
const Question = db.question;
const Exam = db.exam;


exports.getAllExam = async (req, res) => {
    // console.log("err");
    Exam.find.aggregate(AllExamQuery).exec((err, exam) => {
    // console.log(questionController.getByPID());
    // console.log(exam);
    // pID = (exam._id);
    // var response={};
    // Question.find({"parentId":pID},function(err, questions){
    // if(err){
    //     console.log(err);
    // }
    // else {
    //   res.status(200).json({exam,...{question:questions}});
    //   return
    // }
    res.status(200).json(exam);
  })
    // res.status(200).json(exam);
  // })
    // Exam.find(function(err, exams){
  //   if(err){
  //       console.log(err);
  //       res.status(500).json({messenger:"error"});
  //       return;
  //   }
  //   if(!exams){
  //     console.log(err);
  //     res.status(500).json({messenger:"exam không tồn tại"});
  //     return;
  // }
  //   // const rest = exams.map(item =>({"_id":item._id,"Name":item.Name}));
  //   // console.log(rest);
 
  //   // console.log(examJson);
  //   res.status(200).json(exams);
    
// });
  // res.status(200).send("JSON.stringify(User.find())");
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