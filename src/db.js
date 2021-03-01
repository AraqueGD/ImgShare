// Import Module Mongoose DB conection
const mongoose = require('mongoose')
// Import URI DB
const { database } = require('./keys')

mongoose.connect(database.URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(db => {
  console.log('DB Connected')
}).catch(err => {
  console.error('Error al Conectar en la Base de Datos', err)
})
