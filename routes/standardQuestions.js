const express = require('express');
const router = express.Router();
const standardQuestion = require('../models/standardQuestion')

router.get('/', async (req, res) => {
    try {
        const questions = await standardQuestion.find()
        // res.json(questions)
        res.json({"results": questions});

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:jlpt/:type', async (req, res) => {
    try {
        const questions = await standardQuestion.find({
          "JLPT"  : req.params.jlpt,
          "Type"  : req.params.type
        })
        res.json({"results": questions})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', getStandardQuestion, (req, res) => {
    res.json(res.question)
})

router.post('/', async (req, res) => {
    const question = new standardQuestion({
      "Question": req.body.Question,
      "Answer": req.body.Answer,
      "Type": req.body.Type, 
      "Recognize": req.body.Recognize,
      "JLPT": req.body.JLPT,
      "Difficulty": req.body.Difficulty, 
    })
    try {
      const newStandardQuestion = await question.save()
      res.status(201).json(newStandardQuestion)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
})

router.patch('/:id', getStandardQuestion, async (req, res) => {
    if (req.body.question != null) {
      res.question.question = req.body.question
    }
    if (req.body.answer != null) {
      res.question.answer = req.body.answer
    }
    if (req.body.difficulty != null) {
      res.question.difficulty = req.body.difficulty
    }
    try {
      const updatedStandardQuestion = await res.question.save()
      res.json(updatedStandardQuestion)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
})

router.delete('/:id', getStandardQuestion, async (req, res) => {
    try {
      await res.question.remove()
      res.json({ message: 'Deleted Question' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})

async function getStandardQuestion(req, res, next) {
    let question
    try {
      question = await standardQuestion.findById(req.params.id)
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