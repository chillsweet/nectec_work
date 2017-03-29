module.exports = (req, res) => {
  if (req.session.member  != undefined) {
    res.redirect('/test/update')
  }
  else {
      res.render('index.html');
  }

}
