const mongoose = require("mongoose");

const Question = mongoose.model(
  "Question",
  new mongoose.Schema({
    hasChild:  Number,
    parentId: mongoose.ObjectId,
    question: {
      type: Object,
      properties: {
        text:String,
        image:  String,
        sound:String,
        hint: String
      }
    },
    answer: {
      type: Object,
      properties: {
        texts:[{
          type: String
        }],
        choices:[{
          type: String
        }],
        image:  String,
        sound:String,
        hint: String
      }
    },
    tags: [{
      type: String,
    }],
    type:  Number,
    orderIndex:  Number
  })
);

module.exports = Question;
