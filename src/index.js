// Import Framework Express Create Server
const express = require('express')

// Import Config File Server
const config = require('./server/config')

// Connect DB
require('./db')

const app = config(express())

// Listen Server
app.listen(app.get('port'), () => {
  console.log(`Server Connected http://localhost:${app.get('port')}`)
})
