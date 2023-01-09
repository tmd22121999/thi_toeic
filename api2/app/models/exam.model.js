const mongoose = require("mongoose");

const Exam = mongoose.model(
  "Exam",
  new mongoose.Schema({
    // _id:  mongoose.ObjectId,
    Name:  String,
    description: String,
    ltype: {
      type: String,
      default:'toeic'
  },
    type:  {
      type: String,
      default:'fulltest'
  }
})
);

module.exports = Exam;
