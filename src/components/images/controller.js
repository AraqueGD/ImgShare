const fs = require('fs-extra')
const { addImage, getUniqueImage, addComment, addLike, deleteImg } = require('./store')

const submitImage = (path, ext, targetPath, title, desc, filename) => {
  return new Promise((resolve, reject) => {
    if (!title || !desc || !filename) {
      console.error('[ErrorController] Datos Incompletos')
      reject('Datos Incorrectos')
      return false
    }

    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
      const newName = fs.rename(path, targetPath)
      const newImg = {
        title: title,
        description: desc,
        filename: filename
      }
      addImage(newImg)
      resolve(newName)
    } else {
      fs.unlink(path)
      console.error('[ErrorController] Datos Incompletos')
      reject('Datos Incorrectos')
      return false
    }
  })
}

const getImage = (image_id, res) => {
  getUniqueImage(image_id, res)
}

const submitComment = (comment, image_id, res) => {
  if (!comment) {
    return Promise.reject('[Error] No hay Comentario')
  }
  return Promise.resolve(addComment(comment, image_id, res))
}

const submitLike = (image_id, res) => {
  return Promise.resolve(addLike(image_id, res))
}

const deleteImage = (image_id) => {
  return Promise.resolve(deleteImg(image_id))
}

module.exports = {
  submitImage,
  getImage,
  submitComment,
  submitLike,
  deleteImage
}
