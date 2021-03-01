const Model = require('../components/images/model')
const ModelComment = require('../components/images/modelComment')

const imageCounter = async () => {
  return await Model.countDocuments()
}

const commentsCounter = async () => {
  return await ModelComment.countDocuments()
}

const imageTotalViewsCounter = async () => {
  try {
    const result = await Model.aggregate([{
      $group: {
        _id: '1',
        viewsTotal: { $sum: '$views' }
      }
    }])
    return result[0].viewsTotal
  } catch (error) {
    console.error('No hay Views')
    return 0
  }
}

const likesTotalCounter = async () => {
  try {
    const result = await Model.aggregate([{
      $group: {
        _id: '1',
        likesTotal: { $sum: '$likes' }
      }
    }])
    return result[0].likesTotal
  } catch (error) {
    console.error('No hay Likes')
    return 0
  }
}

module.exports = async () => {
  const results = await Promise.all([
    imageCounter(),
    commentsCounter(),
    imageTotalViewsCounter(),
    likesTotalCounter()
  ])

  return {
    images: results[0],
    comments: results[1],
    views: results[2],
    likes: results[3]
  }
}
