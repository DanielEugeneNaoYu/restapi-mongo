const express = require('express');
const router = express.Router();
const universalQuestion = require('../models/universalQuestion')

router.get('/', async (req, res) => {
    try {
        const questions = await universalQuestion.find()
        // res.json(questions)
        res.json({"results": questions});

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:jlpt/:type', async (req, res) => {
    try {
        const questions = await universalQuestion.find({
          "JLPT" : req.params.jlpt,
          "Type"  : req.params.type,
        })
        res.json({"results": questions})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', getUniversalQuestion, (req, res) => {
    res.json(res.question)
})

router.post('/', async (req, res) => {
    const question = new universalQuestion({
      "Question": req.body.Question,
      "Answer": req.body.Answer,
      "Type": req.body.Type, 
      "Recognize": req.body.Recognize,
      "JLPT": req.body.JLPT,
      "Difficulty": req.body.Difficulty, 
    })
    try {
      const newUniversalQuestion = await question.save()
      res.status(201).json(newUniversalQuestion)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
})

router.patch('/:id', getUniversalQuestion, async (req, res) => {
    if (req.body.Question != null) {
      res.question.Question = req.body.Question
    }
    if (req.body.Answer != null) {
      res.question.Answer = req.body.Answer
    }
    if (req.body.Difficulty != null) {
      res.question.Difficulty = req.body.Difficulty
    }
    if (req.body.Type != null) {
      res.question.Type = req.body.Type
    }
    if (req.body.JLPT != null) {
      res.question.JLPT = req.body.JLPT
    }
    if (req.body.Recognize != null) {
      res.question.Recognize = req.body.Recognize
    }
    try {
      const updatedUniversalQuestion = await res.question.save()
      res.json(updatedUniversalQuestion)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
})

router.delete('/:id', getUniversalQuestion, async (req, res) => {
    try {
      await res.question.remove()
      res.json({ message: 'Deleted Question' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})

async function getUniversalQuestion(req, res, next) {
    let question
    try {
      question = await universalQuestion.findById(req.params.id)
      if (question == null) {
        return res.status(404).json({ message: 'Cannot find question' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.question = question
    next()
}

module.exports = router;