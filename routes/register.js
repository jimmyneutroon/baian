var database = require('../database');
var bcrypt = require('bcrypt');
var passport = require('passport')
const {check,validationResult} = require('express-validator/check')

function r(app) {

  app.get('/register', function (req, res) {
    console.log(req.user)
    res.render('register.pug', {
      title: 'register page !'
    })
    app.post('/register', [
        check('name', 'the name must be 3 at least').isLength({min: 3,max: undefined}),
        check('email', 'invalid email').isEmail(),
        check('password', 'the password must be at leat 6 chars and less than 30 chars').isLength({min: 3,max: 30}),
        check('passwordConfirmation').isLength({min: 3,max: 30})
      ],
      function (req, res) {

        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);

        if(req.body.password != req.body.passwordConfirmation){
          res.render('register', {error: "invalid password confirmation"})
        }

        if (!errors.isEmpty()) {
          return res.status(422).json({
            errors: errors.array()
          });
        } else {
          bcrypt.hash(req.body.password, 10, function (err, hash){
            if(err){
              throw err

              // if the hashing succeeded
            } else {
              // establish a connection to database
              database.query('INSERT INTO users(name, password, email) VALUES(?, ?, ?)', [
                req.body.name, hash, req.body.email ], function (err, results, field){ 
                  if(err){
                    throw err
                  } else {
                    database.query('SELECT LAST_INSERT_ID() AS user_id', function (err, results, field){
                      if(err) {
                        throw err
                      } else {
                        req.login(results[0].user_id, function (err){
                          if(err){
                            throw err;
                          } else{
                            res.send(`your user_id is ${results[0].user_id}`)
                          }
                        })
                      }
                    })
                }
              })
            }
          })
        }
      })
  })
}

passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
  done(null, user_id);
});

module.exports = r