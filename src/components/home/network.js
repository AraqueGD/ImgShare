const express = require('express')
const router = express.Router()

const sidebar = require('../../helpers/sidebar')

// Query Images Model
const Model = require('../images/model')

router.get('/', async (req, res) => {
  const images = await Model.find().sort({ timestamp: -1 })
  if (!images) {
    res.render('index')
  } else {
    let viewModel = { images: [] }
    viewModel.images = images
    viewModel = await sidebar(viewModel)
    res.render('index', viewModel)
  }
})

module.exports = router
