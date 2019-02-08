
var passport = require('passport')


function r(app){
  app.get('/login', function(req, res){
    res.render('login.pug', {title: 'login page !'})


    app.post('/login', passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/hfjdkfs',
      failureFlash: "invalid parameters" 
    }) ,function(req, res){
      console.log(req.user.username)
      res.redirect(200, '/')
    })
  })
}

module.exports = r