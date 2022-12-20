
const db = require("../models");
const Question = db.question;
const mongoose = require("mongoose");
exports.getByPID = async  (PID) => {
    let pID=PID;
    pID = mongoose.Types.ObjectId(pID);
    // return("1")
    const questions  = await Question.find({"parentId":pID},function(err, questions){
    if(err){
        console.log(err);
        return([ ])
    }
    else {
        console.log("questions");
    }
});

// console.log(questions);
return Promise.resolve(questions)
  // res.status(200).send("JSON.stringify(User.find())");
};