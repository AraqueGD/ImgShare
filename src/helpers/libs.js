const randomNumber = () => {
  const possible = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let number = 0
  for (let i = 0; i < 6; i++) {
    number += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return number
}

module.exports = {
  randomNumber
}
