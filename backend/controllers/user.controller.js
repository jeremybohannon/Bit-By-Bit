const User = require('../models/user.model')
const Data = require('../services/Data/Data.service')
const Auth = require('../services/Auth/Auth.service')
const DataService = new Data()
const AuthService = new Auth()

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

migrateId = (userId, newId) => {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({ userId: userId }, { $set: { userId: newId } }, { useFindAndModify: false }, (err, user) => {
      if (err) {
        console.log(err)
        reject(err)
      }
      console.log(`Migrated user: ${userId} to: ${newId}`)
      resolve()
    })
  }) 
}

exports.read = async ({ body: { userId } }, res, next) => {
  const payload = await AuthService.verify(userId)
  if (Object.keys(payload).length >= 1) {
    const oldId = payload.email
    const userId = payload.sub
    //Temp migration
    await migrateId(oldId, userId)

    User.findOne({ userId: userId }, (err, User) => {
      if (err) return res.send(err)
      if (User === undefined || User === null) {
        const user = createUser(userId)
        user.save(err => {
          if (err) return next(err)
        })
        User = user
      }
      res.send(User)
    })
  } else {
    console.log(`[Read] Error at: ${Date.now()}`)
    res.send({})
  }
}

exports.update = async ({ body: { userId, data } }, res, next) => {
  const payload = await AuthService.verify(userId)
  if (Object.keys(payload).length >= 1) {
    const userId = payload.sub
    User.findOneAndUpdate({ userId: userId }, { $set: { userData: data } }, { useFindAndModify: false }, (err, user) => {
      if (err) {
        console.log(err)
        return next(err)
      }
      res.send(user)
    })
  } else {
    console.log(`[Update] Error at: ${Date.now()}`)
    res.send({})
  }
}

exports.delete = (req, res, next) => {
  const userId = req.params.userId
  User.findByIdAndRemove(userId, (err) => {
    if (err) return next(err)
    res.send(`${userId} deleted successfully.`)
  })
}