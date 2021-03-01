const ModelComment = require('../components/images/modelComment')
const Model = require('../components/images/model')

module.exports = {
  async newest () {
    const comments = await ModelComment.find()
      .limit(5)
      .sort({ timestamp: -1 })
    for (const comment of comments) {
      const image = await Model.findOne({ _id: comment.image_id })
      comment.image = image
    }
    return comments
  }
}
