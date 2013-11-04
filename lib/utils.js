exports.createMessage = function (name, data) {
  return JSON.stringify({ name: name, args: [ data ] });
}