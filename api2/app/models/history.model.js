const mongoose = require("mongoose");

const History = mongoose.model(
  "History",
  new mongoose.Schema({
    userId: mongoose.ObjectId,
    examId: mongoose.ObjectId,
    answers: [{
      type: Object,
      properties: {
        questionId:{
          type: mongoose.ObjectId
        },
        choices:{
          type: String
        },
      }
    }],
    createdAt:{},
  }, {
    timestamps: {
      createdAt: 'created_at', // Use `created_at` to store the created date
    }
    })
);

module.exports = History;
