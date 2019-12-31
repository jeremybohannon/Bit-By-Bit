const User = require('../models/user.model')
const Data = require('../services/Data/Data.service')
const DataService = new Data()

exports.create = (req, res, next) => {
  const user = createUser(req.body.userId)

  user.save((err, user) => {
    if (err) return next(err)
    console.log(user)
    res.send(`User created: ${user.id}`)
  })
}

createUser = (userId) => {
  const userData = DataService.getData()

  const user = new User(
    {
      userId: userId,
      userData: userData
    }
  )

  return user
}

// addNewYear = (user) => {
//   const currentYear = '2020'
//   const newYearData = DataService.generateYear()
//   user.userData[currentYear] = newYearData[currentYear]
//   return user
// }

exports.read = ({ params: { userId } }, res, next) => {
  User.findOne({ userId: userId }, (err, User) => {
    if (err) return res.send(err)
    if (User === undefined || User === null) {
      const user = createUser(userId)
      user.save(err => {
        if (err) return next(err)
      })
      User = user
    }
    // const currentYear = new Date().getFullYear()
    // if(User.userData[currentYear] === undefined || User.userData[currentYear] === null) {
    //   User = addNewYear(User)
    // }
    res.send(User)
  })
}

exports.update = ({ body: { userId, data } }, res, next) => {
  User.findOneAndUpdate({ userId: userId }, { $set: { userData: data } }, { useFindAndModify: false }, (err, user) => {
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