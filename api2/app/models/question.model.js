const mongoose = require("mongoose");

const Question = mongoose.model(
  "Question",
  new mongoose.Schema({
    hasChild:  {
      type: Number,
      default:0,
    },
    parentId: mongoose.ObjectId,
    question: {
      type: Object,
      properties: {
        text:{
          type: String,
          default:'',
        },
        image:  {
          type: String,
          default:'',
        },
        sound:{
          type: String,
          default:'',
        },
        hint: {
          type: String,
          default:'',
        },
      }
    },
    answer: {
        texts:{type:[{
          type: String,
        }],
        default:['(A)']},
        choices:{
          type:[{
          type: String,
          default:'',
        }],
        default: ["(B)", "(C)"]},
        image:  {
          type: String,
          default:'',
        },
        sound:{
          type: String,
          default:'',
        },
        hint: {
          type: String,
          default:'',
        },
      },
    tags: [{
      type: String,
    }],
    type:  {
      type: String,
      default:'t1',
    },
    orderIndex:  {
      type: Number,
      default:0,
    },
  })
);

module.exports = Question;
