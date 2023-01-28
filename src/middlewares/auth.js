const jwt = require('jsonwebtoken')
const SECRET_KEY = 'USERAPI'

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization
    if (token) {
      token = token.split(' ')[1]
      let user = jwt.verify(token, SECRET_KEY)
      req.userId = user.id
    } else {
      return res.status(401).json({
        msg: 'Unauthorized user 1'
      })
    }
    next()
  } catch (err) {
    console.log(err)
    res.status(401).json({
      msg: 'Unauthorized user 2'
    })
  }
}
module.exports = auth
