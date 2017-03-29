module.exports = function () {
  var normalizedPath = require("path").join(__dirname, "model");
console.log(normalizedPath);
  require("fs").readdirSync(normalizedPath).forEach(function(file) {

    require("/" + file);
  });
};
