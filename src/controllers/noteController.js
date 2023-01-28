const note = require('../models/note')
const noteModel = require('../models/note')

const createNote = async (req, res) => {
  const { title, description } = req.body
  const newNote = new noteModel({
    title: title,
    description: description,
    userId: req.userId
  })
  try {
    await newNote.save()
    res.status(201).json(newNote)
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Something went wrong' })
  }
}

const updateNote = async (req, res) => {
  const id = req.params.id
  const { title, description } = req.body
  const newNote = {
    title: title,
    description: description,
    userId: req.userId
  }
  try {
    await noteModel.findByIdAndUpdate(id, newNote, { new: true })
    res.status(200).json(newNote)
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Something went wrong' })
  }
}

const deleteNote = async (req, res) => {
  const id = req.params.id

  try {
    const note = await noteModel.findByIdAndRemove(id)
    res.status(202).json({ note })
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Something went wrong' })
  }
}

const getNotes = async (req, res) => {
  try {
    const notes = await noteModel.find({ userId: req.userId })
    res.status(200).json(notes)
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Something went wrong' })
  }
}

module.exports = {
  createNote,
  updateNote,
  deleteNote,
  getNotes
}
