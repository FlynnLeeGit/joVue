module.exports = function(val) {
  if (val instanceof Array) {
    return val.length === 0
  }
  if (val instanceof Object) {
    return Object.keys(val).length === 0
  }
  if (typeof val === 'String') {
    return val === '0'
  }
  return false
}
