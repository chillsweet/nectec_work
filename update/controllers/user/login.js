var user = {};
var model = require('../../models/user/login');

user.login = (req, res) => {

  model.getUsername(req.body.username,req.body.password, (row)=>{

    if(row.length > 0){
      req.session.member = row[0];
      res.redirect('/user');
    }else {
      res.json([{"masg":"username and password not member ", 'staus':false}]);
    }

  });

}

module.exports = user;
