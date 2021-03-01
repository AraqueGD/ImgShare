const express = require('express')
const router = express.Router()
const path = require('path')
const { success, error } = require('../../routes/response')

// Controllers Functions
const controller = require('./controller')

// Helpers
const helpers = require('../../helpers/libs')

// Model
const Model = require('./model')

router.get('/:image_id', (req, res) => {
  controller.getImage(req.params.image_id, res)
})

router.post('/', (req, res) => {
  const saveImage = async () => {
    const imgURL = helpers.randomNumber()
    const images = await Model.find({ filename: imgURL })
    if (images.length > 0) {
      saveImage()
    } else {
      const imageTempPath = req.file.path
      const ext = path.extname(req.file.originalname).toLocaleLowerCase()
      const targetPath = path.resolve(`src/public/upload/${imgURL}${ext}`)
      const filename = imgURL + ext
      controller.submitImage(imageTempPath, ext, targetPath, req.body.title, req.body.description, filename).then(data => {
        success(req, res, data, 201)
      }).catch(err => {
        error(req, res, 'Error Interno', 500, err)
      })
      res.redirect('/images/' + imgURL)
    }
  }
  saveImage()
})

router.post('/:image_id/like', (req, res) => {
  controller.submitLike(req.params.image_id, res).then(like => {
    success(req, res, like, 201)
  }).catch(err => {
    error(req, res, 'Error Interno', 500, err)
  })
})

router.post('/:image_id/comment', (req, res) => {
  controller.submitComment(req.body, req.params.image_id, res).then((data) => {
    success(req, res, data, 201)
  }).catch(err => {
    error(req, res, 'Error Interno', 500, err)
  })
})

router.delete('/:image_id', (req, res) => {
  controller.deleteImage(req.params.image_id).then((data) => {
    success(res, res, data, 200)
  }).catch(err => {
    error(req, res, 'Error Interno', 500, err)
  })
  res.json(true)
})

module.exports = router
