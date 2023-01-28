const express = require('express')
const noteRouter = express.Router()
const {
  getNotes,
  createNote,
  deleteNote,
  updateNote
} = require('../controllers/noteController')
const auth = require('../middlewares/auth')

noteRouter.get('/', auth, getNotes)

noteRouter.post('/', auth, createNote)

noteRouter.delete('/:id', auth, deleteNote)

noteRouter.put('/:id', auth, updateNote)

module.exports = noteRouter
