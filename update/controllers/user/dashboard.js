var dashboard = {};
var helper = require('../../helper/location');
dashboard.index = function(req ,res, next){

if (req.session.member  != undefined) {
   res.render('dashboard.html')
}
else {
  throw next;
}

}
dashboard.location =  function(req ,res, next){
      var latitude= req.body.latitude;
      var longitude = req.body.longitude;
      helper.getlocal(latitude,longitude, function(data){
        var temp = {place:data};
        console.log(data);
        var file = './public/location.json';
        var jsonfile = require('jsonfile');
        jsonfile.writeFile(file,temp);

      });
      res.json(req.body);

}
module.exports = dashboard;
