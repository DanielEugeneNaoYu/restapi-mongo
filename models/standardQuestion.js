const mongoose = require('mongoose');

const standardQuestionSchema = new mongoose.Schema({
    Question: {
        type: String,
        required: true
      },
    Answer  : {
        type: String,
        required: true
      },
    Type    : {
        type: String,
        required: true
      },
    JLPT  : {
        type: String,
        required: true
      },
    Difficulty  : {
        type: String,
        required: true
      },
    Recognize  : {
        type: Boolean,
        required: true
      },
})

module.exports = mongoose.model('standardQuestion', standardQuestionSchema)