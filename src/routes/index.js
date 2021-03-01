// Controllers
const home = require('../components/home/network')
const images = require('../components/images/network')

const router = (server) => {
  server.use('/', home)
  server.use('/images', images)
}

module.exports = router
