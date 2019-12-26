const User = require('../models/user.model')
const Data = require('../services/Data/Data.service')

exports.create = (req, res, next) => {
  const user = createUser(req.body.userId)

  user.save((err, user) => {
    if (err) return next(err)
    console.log(user)
    res.send(`User created: ${user.id}`)
  })
}

createUser = (userId) => {
  const DataService = new Data()
  const userData = DataService.getData()

  const user = new User(
    {
      userId: userId,
      userData: userData
    }
  )

  return user
}

exports.read = ({params: {userId}}, res, next) => {
  User.findOne({ "userId": userId }, (err, User) => {
    if (err) return res.send(err)
    if(User === undefined || User === null) {
      console.log('creating new user')
      const user = createUser(userId)
      user.save((err, user) => {
        if (err) return next(err)
      })
      User = user
    }
    res.send(User)
  })
}

exports.update = (req, res, next) => {
  const userId = req.body.userId
  const userData = req.body.data
  User.findOneAndUpdate(userId, {$set: {"userData":userData}}, {upsert: false, new: true, useFindAndModify: false}, (err, user) => {
    if (err) {
      console.log(err)
      return next(err)
    }
    res.send(user)
  })
}

exports.delete = (req, res, next) => {
  const userId = req.params.userId
  User.findByIdAndRemove(userId, (err) => {
    if (err) return next(err)
    res.send(`${userId} deleted successfully.`)
  })
}