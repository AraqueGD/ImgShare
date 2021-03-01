const Model = require('../components/images/model')

module.exports = {
  async popular () {
    const images = await Model.find()
      .limit(9)
      .sort({ likes: -1 })
    return images
  }
}
