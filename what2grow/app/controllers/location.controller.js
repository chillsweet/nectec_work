
exports.Getloacations = function (req, res) {
  var location = require('load')('model','location');
  location.saveFile(req.body, function(data){
    res.json(data);
  });

};
