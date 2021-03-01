const Model = require('./model')
const ModelComment = require('./modelComment')
const md5 = require('md5')
const fs = require('fs-extra')
const path = require('path')
const sidebar = require('../../helpers/sidebar')

const submitImage = async (newImg) => {
  const myImage = new Model(newImg)
  return await myImage.save()
}

const getImage = async (image_id, res) => {
  let viewModel = { image: {}, comments: {} }
  const image = await Model.findOne({ filename: { $regex: image_id } })
  if (image) {
    image.views = image.views + 1
    viewModel.image = image
    await image.save()
    const comments = await ModelComment.find({ image_id: image._id })
    viewModel.comments = comments
    viewModel = await sidebar(viewModel)
    res.render('image', viewModel)
  } else {
    res.redirect('/')
  }
}

const submitComment = async (comment, image_id, res) => {
  const image = await Model.findOne({ filename: { $regex: image_id } })
  if (image) {
    const newComment = new ModelComment(comment)
    newComment.gravatar = md5(newComment.email)
    newComment.image_id = image._id
    await newComment.save()
    res.redirect('/images/' + image.uniqueId)
  } else {
    res.redirect('/')
  }
}

const submitLike = async (image_id, res) => {
  const image = await Model.findOne({ filename: { $regex: image_id } })
  if (image) {
    image.likes = image.likes + 1
    await image.save()
    res.json({ like: image.likes })
  } else {
    res.status(500).json({ error: 'Internal Error' })
  }
}

const deleteImage = async (image_id) => {
  const image = await Model.findOne({ filename: { $regex: image_id } })
  if (image) {
    await fs.unlink(path.resolve('./src/public/upload/' + image.filename))
    await ModelComment.deleteOne({ image_id: image._id })
    await image.remove()
    return true
  }
}

module.exports = {
  addImage: submitImage,
  getUniqueImage: getImage,
  addComment: submitComment,
  addLike: submitLike,
  deleteImg: deleteImage
}
