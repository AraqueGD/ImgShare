const success = (req, res, messege, status) => {
  res.status(status || 200).send({
    error: '',
    body: messege
  })
}

const error = (req, res, message, status, details) => {
  res.status(status || 500).send({
    error: message,
    body: ''
  })
  console.log(details)
}

module.exports = {
  success,
  error
}
