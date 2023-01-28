const express = require('express')
const app = express()
const mongoose = require('mongoose')
const noteRouter = require('./routes/noteRoutes')
const userRouter = require('./routes/userRoutes')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 5000

mongoose.set('strictQuery', false)
app.use(express.json())
app.use(cors())

app.use('/users', userRouter)
app.use('/note', noteRouter)
app.get('/', (req, res) => {
  res.send('HRBT API started')
})

mongoose
  .connect(
    'mongodb+srv://admin:admin@cluster0.dxhbocw.mongodb.net/hrbt_db?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server started on port no.' + PORT)
    })
  })
  .catch(err => {
    console.log(err)
  })
