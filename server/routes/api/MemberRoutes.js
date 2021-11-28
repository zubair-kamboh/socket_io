const express = require('express')
const router = express.Router()
// let members = require('../../../members.js')
// const uuid = require('uuid')
const ApiModel = require('../../model/ApiSchema')

router.get('/', (req, res) => {
  ApiModel.find({})
    .then((members) => res.json(members))
    .catch((err) => console.log(err))
})

// get specific member
router.get('/:id', (req, res) => {
  ApiModel.findById({ _id: req.params.id }, (err, member) => {
    if (err) throw err
    res.json(member)
  })
})

router.delete('/:id', (req, res) => {
  ApiModel.findByIdAndRemove({ _id: req.params.id }, {}, (err, member) => {
    if (err) throw err
    res.json({ msg: 'member deleted', member })
  })
})

router.put('/:id', (req, res) => {
  ApiModel.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      email: req.body.email,
    },
    { new: true },
    (err, updatedMember) => {
      if (err) throw err
      res.json({ msg: 'member updated', updatedMember })
    }
  )
})

router.post('/', (req, res) => {
  const member = new ApiModel({
    name: req.body.name,
    email: req.body.email,
    image: req.body.image && req.body.image,
  })

  console.log(req.body)

  if (!req.body.name || !req.body.email || !req.body.image) {
    return res.json({ msg: 'Please include a name and an email' })
  }

  member
    .save()
    .then((mem) => res.json(mem))
    .catch((err) => res.json({ msg: err }))
})

module.exports = router
