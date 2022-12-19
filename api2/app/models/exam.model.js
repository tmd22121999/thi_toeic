const mongoose = require("mongoose");

const Exam = mongoose.model(
  "Exam",
  new mongoose.Schema({
    // _id:  mongoose.ObjectId,
    Name:  String,
    description: String,
    ltype: String,
    type:  String
})
);

module.exports = Exam;
