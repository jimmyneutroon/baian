

function r(app){
  app.get('/user', function(req, res){
    res.render('user.pug', {
      title: 'user page !',
    })
  })
}

module.exports = r