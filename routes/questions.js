const express = require('express');
const router = express.Router();
const Question = require('../models/question')

router.get('/', async (req, res) => {
    try {
        const questions = await Question.find()
        res.json(questions)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:genre/:category/:difficulty', async (req, res) => {
    try {
        const questions = await Question.find({
          "genre" : req.params.genre,
          "category"  : req.params.category,
          "difficulty" : req.params.difficulty,
        })
        res.json(questions)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', getQuestion, (req, res) => {
    res.json(res.question)
})

router.post('/', async (req, res) => {
    const question = new Question({
      question: req.body.question,
      answer: req.body.answer,
      difficulty: req.body.difficulty, 
    })
    try {
      const newQuestion = await question.save()
      res.status(201).json(newQuestion)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
})

router.patch('/:id', getQuestion, async (req, res) => {
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
      const updatedQuestion = await res.question.save()
      res.json(updatedQuestion)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
})

router.delete('/:id', getQuestion, async (req, res) => {
    try {
      await res.question.remove()
      res.json({ message: 'Deleted Question' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
})

async function getQuestion(req, res, next) {
    let question
    try {
      question = await Question.findById(req.params.id)
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