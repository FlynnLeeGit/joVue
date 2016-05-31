module.exports = function(str, splitCode = ',') {
  if (typeof str === 'string' && str) {
    return str.split(splitCode)
  } else {
    return []
  }
}
