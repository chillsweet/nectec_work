var logout ={};

logout.index = (req, res) =>{

  req.session.member = undefined;
  res.redirect('/');
}

module.exports = logout;
