const Byte = require('../models/byte.model')

exports.create = (req, res, next) => {
  const byte = new Byte(
    {
      date: req.body.date,
      mood: req.body.mood
    }
  )

  byte.save((err, byte) => {
    if (err) return next(err)
    res.send(`Byte created: ${byte.id}`)
  })
}

exports.read = (req, res, next) => {
  Byte.findById(req.params.id, (err, byte) => {
      if (err) return next(err)
      res.send(byte);
  })
}

exports.update = (req, res, next) => {
   Byte.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, byte) => {
      if (err) return next(err)
      res.send(byte)
  });
}

exports.delete = (req, res, next) => {
  Byte.findByIdAndRemove(req.params.id, (err) => {
      if (err) return next(err)
      res.send(`${req.params.id} deleted successfully.`)
  })
}